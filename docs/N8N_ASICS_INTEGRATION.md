# n8n Asics Upload Integration Guide

This guide explains how to integrate the Asics marketing asset upload page with your n8n workflow.

## Overview

The `/asics` page replaces the "on form submission" node in your n8n workflow with a dedicated web interface. Files are uploaded via the Next.js API route which then triggers your n8n workflow via webhook.

## Architecture

```
User uploads files → /asics page → /api/asics-upload → n8n webhook → Your workflow
```

## Setup Steps

### 1. Create n8n Webhook

1. Open your n8n workflow
2. Add a **Webhook** node at the start (replacing the form submission trigger)
3. Configure the webhook:
   - **HTTP Method**: POST
   - **Path**: `/asics-upload` (or your preferred path)
   - **Authentication**: None (or configure as needed)
   - **Response Mode**: Wait for Response
4. Save and activate the webhook
5. Copy the webhook URL (e.g., `https://your-n8n-instance.com/webhook/asics-upload`)

### 2. Configure Environment Variables

Add the webhook URL to your `.env.local` file:

```bash
N8N_ASICS_WEBHOOK_URL=https://your-n8n-instance.com/webhook/asics-upload
```

### 3. Enable Webhook in API Route

Edit `/app/api/asics-upload/route.ts` and uncomment the webhook code:

```typescript
const n8nWebhookUrl = process.env.N8N_ASICS_WEBHOOK_URL;

if (n8nWebhookUrl) {
  const webhookResponse = await fetch(n8nWebhookUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      timestamp: new Date().toISOString(),
      filesCount: files.length,
      files: filesData
    })
  });

  if (!webhookResponse.ok) {
    throw new Error('Failed to trigger n8n workflow');
  }
}
```

## Webhook Payload

The n8n webhook will receive the following JSON payload:

```json
{
  "timestamp": "2026-02-04T19:00:00.000Z",
  "filesCount": 3,
  "files": [
    {
      "name": "marketing-asset-1.jpg",
      "size": 245678,
      "type": "image/jpeg",
      "data": "base64-encoded-image-data-here..."
    },
    {
      "name": "marketing-asset-2.jpg",
      "size": 189234,
      "type": "image/jpeg",
      "data": "base64-encoded-image-data-here..."
    }
  ]
}
```

## n8n Workflow Example

Here's a suggested workflow structure:

### Node 1: Webhook (Trigger)
- Receives the file upload payload

### Node 2: Split Files (Split In Batches)
- Process files one at a time or in batches

### Node 3: Decode Base64 (Code Node)
```javascript
// Decode base64 image data
const base64Data = $json.data;
const buffer = Buffer.from(base64Data, 'base64');

return {
  json: {
    fileName: $json.name,
    fileSize: $json.size,
    fileType: $json.type,
    buffer: buffer
  }
};
```

### Node 4: Save to Storage (HTTP Request or AWS S3)
- Upload file to cloud storage
- Get public URL for reverse image search

### Node 5: Reverse Image Search (HTTP Request)
- Use Google Images API, TinEye, or similar service
- Search for the image online

### Node 6: Aggregate Results (Merge)
- Collect all search results

### Node 7: Generate Report (Code Node)
- Format results into a readable report

### Node 8: Send Email (Gmail or SMTP)
- Send report to Asics marketing team
- Include links to where assets were found

## Testing

1. Start your Next.js dev server:
   ```bash
   npm run dev
   ```

2. Navigate to `http://localhost:3000/asics`

3. Upload test JPG files

4. Check your n8n workflow execution log to verify:
   - Webhook received the payload
   - Files were decoded successfully
   - Workflow completed without errors

## Security Considerations

### Production Recommendations

1. **Webhook Authentication**: Add authentication to your n8n webhook
   ```typescript
   headers: {
     'Content-Type': 'application/json',
     'Authorization': `Bearer ${process.env.N8N_WEBHOOK_TOKEN}`
   }
   ```

2. **File Size Limits**: Add validation in the API route
   ```typescript
   const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB
   if (file.size > MAX_FILE_SIZE) {
     throw new Error('File too large');
   }
   ```

3. **Rate Limiting**: Implement rate limiting for the upload endpoint

4. **HTTPS Only**: Ensure webhook URL uses HTTPS in production

5. **IP Allowlisting**: Configure n8n to only accept webhooks from your server's IP

## Troubleshooting

### Webhook Not Triggering

- Verify webhook URL is correct in `.env.local`
- Check n8n workflow is activated
- Review API route logs for errors
- Test webhook directly with curl:
  ```bash
  curl -X POST https://your-n8n-instance.com/webhook/asics-upload \
    -H "Content-Type: application/json" \
    -d '{"test": true}'
  ```

### Files Not Processing

- Check base64 encoding/decoding in n8n
- Verify file size limits aren't exceeded
- Review n8n execution logs for errors

### Upload Timeout

- Increase timeout in API route if needed
- Consider async processing for large files
- Return immediate response and process in background

## Support

For issues or questions:
- Email: alexandre@teamdesk.app
- Check n8n logs: Settings > Executions
- Review Next.js logs: `npm run dev` output
