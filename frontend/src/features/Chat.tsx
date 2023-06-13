import { useEffect, useState } from 'react';
import './scss/style.scss';
import { ReactComponent as Avatar } from './assets/robot-svgrepo-com.svg';
const { Configuration, OpenAIApi } = require('openai');

const Fake = [
  "Hi there, I'm Fabio and you?",
  'Nice to meet you',
  'How are you?',
  'Not too bad, thanks',
  'What do you do?',
  "That's awesome",
  'Codepen is a nice place to stay',
  "I think you're a nice person",
  'Why do you think that?',
  'Can you explain?',
  "Anyway I've gotta go now",
  'It was a pleasure chat with you',
  'Time to make a new codepen',
  'Bye',
  ':)',
];

function Chat(): JSX.Element {
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);
  const [prompt, setPrompt] = useState('');
  const [apiResponse, setApiResponse] = useState('');
  const [loading, setLoading] = useState(false);

  //  const [messages, setMessages] = useState<any[]>([]);
  //  let d: Date;
  //  let h: number;
  //  let m: number;
  //  let i = 0;

  //  console.log(messages);

  //  const setDate = (): void => {
  //    d = new Date();
  //    if (m != d.getMinutes()) {
  //      m = d.getMinutes();
  //      setMessages([...messages, <div className="timestamp">{d.getHours() + ':' + m}</div>]);
  //    }
  //  };

  //  const insertMessage = (): boolean | undefined => {
  //    let msg = document.querySelector('.message-input') as HTMLInputElement;

  //    if (msg.value.trim() == '') {
  //      return false;
  //    }

  //    setMessages([...messages, <div className="message message-personal">{msg.value}</div>]);

  //    setDate();
  //    msg.value = '';

  //    setTimeout(() => fakeMessage(), 1000 + Math.random() * 2000);
  //  };

  //  const fakeMessage = (): boolean | undefined => {
  //    let msg = document.querySelector('.message-input') as HTMLInputElement;
  //    if (msg.value != '') return false;

  //    setMessages([
  //      ...messages,
  //      <div className="message loading new">
  //        <figure className="avatar">
  //          <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg" />
  //        </figure>
  //        <span></span>
  //      </div>,
  //    ]);

  //    setTimeout(() => {
  //      setMessages(messages.splice(messages.length - 1, 1));
  //      setMessages([
  //        ...messages,
  //        <div className="message new">
  //          <figure className="avatar">
  //            <img src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/156381/profile/profile-80.jpg" />
  //          </figure>
  //          {Fake[i]}
  //        </div>,
  //      ]);
  //      setDate();
  //      i++;
  //    }, 1000 + Math.random() * 2000);
  //  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<any> => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await openai.createCompletion({
        model: 'text-davinci-003',
        prompt: prompt,
        temperature: 0.5,
        max_tokens: 4000,
      });
      console.log('response', result.data.choices[0].text);
      setApiResponse((prev) => (prev = result.data.choices[0].text));
    } catch (e) {
      //console.log(e);
      setApiResponse('Something is going wrong, Please try again.');
    }
    setLoading(false);
  };

  return (
    <>
      <div className="chat">
        <div className="chat-title">
          <h1>AI friend</h1>
          <h2>bot</h2>
          <figure className="avatar">
            <Avatar />
          </figure>
        </div>
        <div className="messages">
          <div className="messages-content">
            {apiResponse && (
              <>
                <strong>API response:</strong>
                {apiResponse}
              </>
            )}
          </div>
        </div>
        <form className="message-box" onSubmit={handleSubmit}>
          <textarea
            className="message-input"
            placeholder="Please ask to openai ..."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}></textarea>
          <button
            type="submit"
            className="message-submit"
            disabled={loading || prompt.length === 0}>
            {loading ? 'Generating...' : 'Generate'}
          </button>
        </form>
      </div>
      <div className="bg"></div>
    </>
  );
}

export default Chat;
