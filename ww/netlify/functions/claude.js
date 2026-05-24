exports.handler = async function(event) {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + process.env.OPENROUTER_API_KEY
    },
    body: JSON.stringify({
      model: 'anthropic/claude-sonnet-4',
      messages: JSON.parse(event.body).messages
    })
  });

  const data = await response.json();
  const reply = data.choices?.[0]?.message?.content || '응답을 받지 못했어요.';
  return {
    statusCode: 200,
    headers: { 'Access-Control-Allow-Origin': '*' },
    body: JSON.stringify({ content: [{ text: reply }] })
  };
};