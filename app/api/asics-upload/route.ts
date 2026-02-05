import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files: File[] = [];
    
    // Extract all files from the form data
    for (const [key, value] of formData.entries()) {
      if (value instanceof File) {
        files.push(value);
      }
    }

    if (files.length === 0) {
      return NextResponse.json(
        { error: 'No files uploaded' },
        { status: 400 }
      );
    }

    console.log(`Received ${files.length} files for processing:`);
    files.forEach((file, index) => {
      console.log(`${index + 1}. ${file.name} (${file.size} bytes)`);
    });

    // Create new FormData for n8n with actual binary files
    const n8nFormData = new FormData();
    
    // Add metadata fields
    n8nFormData.append('timestamp', new Date().toISOString());
    n8nFormData.append('filenames', JSON.stringify(files.map(f => f.name)));
    
    // Add each file as binary data
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const arrayBuffer = await file.arrayBuffer();
      const blob = new Blob([arrayBuffer], { type: file.type });
      n8nFormData.append(`file${i}`, blob, file.name);
    }

    // Trigger n8n workflow with binary data
    const n8nWebhookUrl = 'https://alexandresaussier.app.n8n.cloud/webhook/56f64359-25de-4bcc-9f5d-c38070401988';
    
    try {
      const webhookResponse = await fetch(n8nWebhookUrl, {
        method: 'POST',
        body: n8nFormData
        // Don't set Content-Type header - fetch will set it automatically with boundary
      });

      if (!webhookResponse.ok) {
        const errorText = await webhookResponse.text();
        console.error('n8n webhook error:', errorText);
        throw new Error(`Failed to trigger n8n workflow: ${webhookResponse.status}`);
      }

      const responseData = await webhookResponse.text();
      console.log('Successfully triggered n8n workflow:', responseData);
    } catch (webhookError) {
      console.error('Error calling n8n webhook:', webhookError);
      // Throw error to inform user that webhook failed
      throw new Error('Failed to send files to processing workflow');
    }
    
    return NextResponse.json({
      success: true,
      message: `Successfully uploaded and processing ${files.length} file(s)`,
      files: files.map(f => ({
        name: f.name,
        size: f.size,
        type: f.type
      }))
    });

  } catch (error) {
    console.error('Error processing upload:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to process upload' },
      { status: 500 }
    );
  }
}
