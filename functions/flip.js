export async function onRequest(context) {
  const parsedUrl = new URL(context.request.url);
  const query = parsedUrl.searchParams.get('q');

  if (query === undefined) {
    return new Response('Expected query parameter "?q=a,b,c"');
  }

  const options = query.split(',');
  options.sort(() => Math.random() - 0.5);

  const itemsHtml = options.map(x => `<li>${x}</li>\n`).join('');
  const metaHtml = `
<meta property="og:type" content="website">
<meta property="og:url" content="${context.request.url}">
<meta property="og:title" content="Flip">
<meta property="og:image" content="/content/icon.png">
<meta property="og:description" content="${options[0]}">\n`;

  const html = `
<!DOCTYPE html>
<html>
  ${metaHtml}
  <style>
    body {
      background: #1d1918;
      color: white;
      font-family: sans-serif;
    }
    li:first-child {
      font-weight: bold;
    }
    li:not(:first-child) {
      color: #555555;
    }
  </style>
  <body>
    <ul>
      ${itemsHtml}
    </ul>
  </body>
<html>`;

  return new Response(html, {
    headers: {
      "content-type": "text/html;charset=UTF-8"
    }
  });
}