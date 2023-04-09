import { NextApiRequest, NextApiResponse } from "next"
import { supabase } from "@lib/supabaseClient"
import { log } from "next-axiom"

const htmlpage = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <title>Unsubscribe</title>
  </head>
  <body>
    <h1>Unsubscribe</h1>
    <p>Are you sure you want to unsubscribe from my newsletter?</p>
    <button id="unsubscribe">Unsubscribe</button>
    <script>
      const unsubscribe = document.getElementById("unsubscribe")
      unsubscribe.addEventListener("click", async () => {
        const address = window.location.search.split("=")[1]
        const confirmation = true
        const response = await fetch("/api/newsletter/unsubscribe", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ address, confirmation }),
        })
        const data = await response.json()
        if (data.success) {
          alert("You have been unsubscribed from my newsletter!")
          window.close()
        } else {
          alert("Failed to unsubscribe from my newsletter!")
        }
      })
    </script>
  </body>
</html>
`

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    // check if mail address exists in database
    const address = req.query.address as string
    const { data } = await supabase
      .from("mailing_list")
      .select("*")
      .eq("address", address)

    if (data.length === 0) {
      log.error(`Email address ${address} not found in database`)
      res.status(404).send("Not found")
      return
    }

    res.status(200).send(htmlpage)
  } else if (req.method === "POST") {
    const address = req.body.address
    const confirmation = req.body.confirmation

    log.info(`received request to unsubscribe ${address}`)

    if (confirmation) {
      const { error } = await supabase
        .from("mailing_list")
        .update({ is_unsubscribed: true })
        .eq("address", address)

      if (error) {
        log.error(error.message)
        res.status(500).json({ success: false, error: error.message })
        return
      }

      log.info(`successfully unsubscribed ${address}`)
      res.status(200).json({ success: true })
    } else {
      log.info(`user cancelled unsubscribe request for ${address}`)
      res.status(200).json({ success: false })
    }
  }
}
