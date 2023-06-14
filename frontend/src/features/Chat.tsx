import { useEffect, useState } from 'react';
import './scss/style.scss';
import { ReactComponent as Avatar } from './assets/robot-svgrepo-com.svg';
import { Messages } from './types/Message';
const { Configuration, OpenAIApi } = require('openai');

function Chat(): JSX.Element {
  const configuration = new Configuration({
    apiKey: process.env.REACT_APP_OPENAI_API_KEY,
  });

  const openai = new OpenAIApi(configuration);
  const [prompt, setPrompt] = useState('');
  const [apiResponse, setApiResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<Messages[]>([]);

  console.log(message);
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

      const allMessages = {
        toMessage: prompt,
        meMessage: apiResponse,
      };
      setMessage((prev) => [...prev, allMessages]);
    } catch (e) {
      setApiResponse('Something is going wrong, Please try again.');

      const allMessages = {
        toMessage: prompt,
        meMessage: "I'm fine, but how are you doing? What are you doing?",
      };
      setMessage((prev) => [...prev, allMessages]);
    }
    setLoading(false);
  };

  function sayHi(val: string): string {
    return val;
  }

  setTimeout(sayHi, 100000);

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
            {/*{apiResponse && message && (
              <div className="bubble-you" key={crypto.randomUUID()}>
                <strong>API response: </strong>
                {apiResponse}
              </div>
            )}*/}
            {message ? (
              message.map((el) => (
                <>
                  <div className="bubble-me" key={crypto.randomUUID()}>
                    <strong>Me: </strong>
                    {el.toMessage}
                  </div>
                  <div className="bubble-you" key={crypto.randomUUID()}>
                    <strong>API response: </strong>
                    {el.meMessage}
                  </div>
                </>
              ))
            ) : (
              <>
                <div className="bubble-you" key={crypto.randomUUID()}>
                  <strong>API response: </strong>
                  {apiResponse}
                </div>
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
