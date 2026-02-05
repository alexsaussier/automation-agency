# Asics Marketing Asset Researcher

This page provides a dedicated interface for Asics to upload marketing asset images (JPG format) for analysis. The system searches the internet for exact matches of these assets and provides a report of their usage.

## Features

- **Multi-file upload**: Supports drag-and-drop and traditional file browser
- **JPG/JPEG only**: Filters to only accept JPG/JPEG images
- **Asics branding**: Styled according to Asics brand guidelines (blue #000066)
- **Progress feedback**: Shows upload progress and file list
- **n8n integration**: Designed to replace the "on form submission" node in your workflow

## URL

Access the page at: `https://yourdomain.com/asics`

## API Endpoint

The page uses the `/api/asics-upload` endpoint to handle file uploads.

### Request Format

- **Method**: POST
- **Content-Type**: multipart/form-data
- **Body**: FormData with file entries (file0, file1, file2, etc.)

### Response Format

```json
{
  "success": true,
  "message": "Successfully received N file(s)",
  "files": [
    {
      "name": "asset1.jpg",
      "size": 123456,
      "type": "image/jpeg"
    }
  ]
}
```

## n8n Integration

To connect this to your n8n workflow:

1. **Add webhook URL to environment variables**:
   ```bash
   # Add to .env.local
   N8N_ASICS_WEBHOOK_URL=https://your-n8n-instance.com/webhook/asics-upload
   ```

2. **Uncomment the webhook code** in `/app/api/asics-upload/route.ts`

3. **Update your n8n workflow**:
   - Replace the form submission trigger with a webhook trigger
   - Configure the webhook to receive POST requests
   - The webhook will receive JSON with:
     ```json
     {
       "timestamp": "2026-02-04T19:00:00.000Z",
       "filesCount": 3,
       "files": [
         {
           "name": "asset.jpg",
           "size": 123456,
           "type": "image/jpeg",
           "data": "base64-encoded-image-data"
         }
       ]
     }
     ```

4. **Process files in n8n**:
   - Decode base64 data to retrieve original images
   - Perform reverse image search
   - Generate report
   - Send email notification

## Styling

The page uses Asics official brand colors:
- **Primary Blue**: #000066 (RGB: 0, 0, 102)
- **Logo**: White version on blue header
- **Typography**: Inter & Roboto fonts (inherited from site)

## Security Considerations

- File type validation on both client and server
- Maximum file size limits (configurable in API route)
- CORS protection via Next.js API routes
- Environment variables for sensitive webhook URLs

## Testing

To test the upload functionality:

1. Start development server: `npm run dev`
2. Navigate to `http://localhost:3000/asics`
3. Upload test JPG files
4. Check console logs for file information
5. Verify n8n webhook receives data (if configured)

## Maintenance

- Update Asics logo at `/public/asics-logo.png`
- Modify brand colors in `/app/asics/page.tsx`
- Adjust file size limits in API route if needed
- Monitor n8n webhook health and response times
