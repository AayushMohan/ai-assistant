'use server'

import { AzureKeyCredential, ChatRequestMessage, OpenAIClient } from "@azure/openai"

async function transcript(prevState: any, { formData }: { formData: any }) {
 console.log("PREVIOUS STATE", prevState)

 if (process.env.AZURE_API_KEY === undefined || process.env.AZURE_ENDPOINT === undefined || process.env.AZURE_DEPLOYMENT_NAME === undefined || process.env.AZURE_DEPLOYMENT_COMPLETIONS_NAME === undefined) {
  console.error("Azure credentials not set")
 }
}

export default transcript