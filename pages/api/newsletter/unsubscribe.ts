import { NextApiRequest, NextApiResponse } from "next"
import { supabase } from "@lib/supabaseClient"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const address = req.query.address

  try {
    const { error } = await supabase
      .from("mailing_list")
      .update({ is_unsubscribed: true })
      .eq("address", address)

    if (error) {
      throw new Error(error.message)
    }

    res.status(200).json({ success: true })
  } catch (error) {
    res.status(500).json({ success: false, error: error.message })
  }
}
