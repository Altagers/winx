import { setUserNotificationDetails, deleteUserNotificationDetails } from "@/lib/notification"
import { sendFrameNotification } from "@/lib/notification-client"
import { http } from "viem"
import { createPublicClient } from "viem"
import { optimism } from "viem/chains"

const appName = process.env.NEXT_PUBLIC_ONCHAINKIT_PROJECT_NAME || "Winx Analyzer"

const KEY_REGISTRY_ADDRESS = "0x00000000Fc1237824fb747aBDE0FF18990E59b7e"

const KEY_REGISTRY_ABI = [
  {
    inputs: [
      { name: "fid", type: "uint256" },
      { name: "key", type: "bytes" },
    ],
    name: "keyDataOf",
    outputs: [
      {
        components: [
          { name: "state", type: "uint8" },
          { name: "keyType", type: "uint32" },
        ],
        name: "",
        type: "tuple",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const

async function verifyFidOwnership(fid: number, appKey: `0x${string}`) {
  const client = createPublicClient({
    chain: optimism,
    transport: http(),
  })

  try {
    const result = await client.readContract({
      address: KEY_REGISTRY_ADDRESS,
      abi: KEY_REGISTRY_ABI,
      functionName: "keyDataOf",
      args: [BigInt(fid), appKey],
    })

    return result.state === 1 && result.keyType === 1
  } catch (error) {
    console.error("Key Registry verification failed:", error)
    return false
  }
}

function decode(encoded: string) {
  return JSON.parse(Buffer.from(encoded, "base64url").toString("utf-8"))
}

export async function POST(request: Request) {
  try {
    const requestJson = await request.json()
    console.log("Webhook received:", JSON.stringify(requestJson, null, 2))

    const { header: encodedHeader, payload: encodedPayload } = requestJson

    if (!encodedHeader || !encodedPayload) {
      console.error("Missing header or payload in webhook request")
      return Response.json({ success: false, error: "Missing header or payload" }, { status: 400 })
    }

    const headerData = decode(encodedHeader)
    const event = decode(encodedPayload)

    console.log("Decoded header:", headerData)
    console.log("Decoded event:", event)

    const { fid, key } = headerData

    if (!fid || !key) {
      console.error("Missing fid or key in header")
      return Response.json({ success: false, error: "Missing fid or key" }, { status: 400 })
    }

    const valid = await verifyFidOwnership(fid, key)

    if (!valid) {
      console.error("Invalid FID ownership for fid:", fid)
      return Response.json({ success: false, error: "Invalid FID ownership" }, { status: 401 })
    }

    switch (event.event) {
      case "frame_added":
        console.log("frame_added event for fid:", fid)
        if (event.notificationDetails) {
          await setUserNotificationDetails(fid, event.notificationDetails)
          await sendFrameNotification({
            fid,
            title: `Welcome to ${appName}! ✨`,
            body: `Thank you for adding ${appName}. Discover your magical essence!`,
          })
        } else {
          await deleteUserNotificationDetails(fid)
        }
        break

      case "frame_removed":
        console.log("frame_removed event for fid:", fid)
        await deleteUserNotificationDetails(fid)
        break

      case "notifications_enabled":
        console.log("notifications_enabled event for fid:", fid)
        if (event.notificationDetails) {
          await setUserNotificationDetails(fid, event.notificationDetails)
          await sendFrameNotification({
            fid,
            title: `${appName} Notifications Enabled! 🧚‍♀️`,
            body: `You'll now receive magical updates from ${appName}!`,
          })
        }
        break

      case "notifications_disabled":
        console.log("notifications_disabled event for fid:", fid)
        await deleteUserNotificationDetails(fid)
        break

      default:
        console.log("Unknown event type:", event.event)
        break
    }

    return Response.json({ success: true })
  } catch (error) {
    console.error("Webhook error:", error)
    return Response.json(
      { success: false, error: error instanceof Error ? error.message : "Unknown error" },
      { status: 500 },
    )
  }
}

// Добавляем GET endpoint для проверки webhook
export async function GET() {
  return Response.json({
    message: "Winx Analyzer Webhook is running",
    timestamp: new Date().toISOString(),
    appName,
  })
}
