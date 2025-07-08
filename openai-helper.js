window.generateMetaDescription = async function (text) {
  const apiKey = "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"; // ⛔ Replace this with your actual key

  const prompt = `Generate an SEO meta description (max 160 characters) for the following content:\n\n"${text}"`;

  const response = await fetch("https://api.openai.com/v1/chat/completions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify({
      model: "gpt-3.5-turbo",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.7
    })
  });

  const result = await response.json();
  const output = result.choices?.[0]?.message?.content || "No description generated.";
  return output.trim();
};
