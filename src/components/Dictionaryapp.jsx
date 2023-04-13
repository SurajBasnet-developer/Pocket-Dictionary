import { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const Form = styled.form`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 1rem;
`;

const Input = styled.input`
  padding: 0.5rem;
  font-size: 1rem;
  border: none;
  border-bottom: 1px solid #ccc;
  margin-right: 0.5rem;
  width: 100%;

  &:focus {
    outline: none;
    border-color: #0077cc;
  }
`;

const Button = styled.button`
  padding: 0.5rem 1rem;
  background-color: #0077cc;
  color: #fff;
  font-size: 1rem;
  border: none;
  border-radius: 3px;
  cursor: pointer;

  &:hover {
    background-color: #005fa3;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 2px #fff, 0 0 0 4px #0077cc;
  }
`;

const Word = styled.h2`
  font-size: 2rem;
  margin-bottom: 0.5rem;
`;

const Audio = styled.audio`
  margin-bottom: 0.5rem;
`;

const Definition = styled.p`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  text-align: center;
  color: wheat;
`;

function Dictionary() {
  const [word, setWord] = useState("");
  const [definition, setDefinition] = useState("");
  const [audioUrl, setAudioUrl] = useState("");
  const [synonyms, setSynonyms] = useState([]);
  const [antonyms, setAntonyms] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en_US/${word}`;
    try {
      const response = await axios.get(apiUrl);
      const data = response.data[0];
      setDefinition(data.meanings[0].definitions[0].definition);
      setAudioUrl(data.phonetics[0].audio);
      setSynonyms(data.meanings[0].definitions[0].synonyms);
      setAntonyms(data.meanings[0].definitions[0].antonyms);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <h1>Pocket Dictionary </h1>
      <Form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={word}
          onChange={(event) => setWord(event.target.value)}
          placeholder="Enter a word"
        />
        <Button type="submit">Search</Button>
      </Form>
      {definition && (
        <div>
          <Word>{word}</Word>
          {audioUrl && (
            <Audio controls>
              <source src={audioUrl} type="audio/mpeg" />
            </Audio>
          )}
          <Definition>{definition}</Definition>
        </div>
      )}
    </div>
  );
}

export default Dictionary;
