const express = require("express");
const axios = require("axios");
const { NlpManager } = require("node-nlp");

const app = express();
const port = 5000;

// Initialize NLP manager
const manager = new NlpManager({ languages: ['en'] });

// Sample knowledge base
const knowledgeBase = {
  segment: "Segment documentation link: https://segment.com/docs/?ref=nav",
  mParticle: "mParticle documentation link: https://docs.mparticle.com/",
  lytics: "Lytics documentation link: https://docs.lytics.com/",
  zeotap: "Zeotap documentation link: https://docs.zeotap.com/home/en-us/"
};

// Pre-load NLP responses for some known questions
const trainNLP = async () => {
  await manager.addDocument('en', 'How do I set up a new source in Segment?', 'howto.segment.source');
  await manager.addDocument('en', 'How can I create a user profile in mParticle?', 'howto.mparticle.profile');
  await manager.addDocument('en', 'How do I build an audience segment in Lytics?', 'howto.lytics.segment');
  await manager.addDocument('en', 'How can I integrate my data with Zeotap?', 'howto.zeotap.integration');

  await manager.train();
  manager.save();
};

// Train the NLP model
trainNLP();

app.use(express.json());

// Route to handle user input (how-to questions)
app.post("/ask", async (req, res) => {
  const { question } = req.body;

  const response = await manager.process('en', question);
  const intent = response.intent;

  if (intent === 'howto.segment.source') {
    return res.json({ answer: knowledgeBase.segment });
  } else if (intent === 'howto.mparticle.profile') {
    return res.json({ answer: knowledgeBase.mParticle });
  } else if (intent === 'howto.lytics.segment') {
    return res.json({ answer: knowledgeBase.lytics });
  } else if (intent === 'howto.zeotap.integration') {
    return res.json({ answer: knowledgeBase.zeotap });
  }

  res.json({ answer: "Sorry, I couldn't find an answer to your question." });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
