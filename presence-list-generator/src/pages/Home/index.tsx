import React, { useState, useEffect } from 'react' 
import './styles.css';
import { Card, CardAtt } from '../../components/Card';
import shortid from 'shortid';

type ProfileResponse = {
  name?: string;
  avatar_url?: string;
  html_url?: string;
}

type Repos = {
  name?: string;
}

type User = {
  name?: string;
  avatar?: string;
  userLink?: string;
}

export function Home() {

  const [studentName, setStudentName] = useState(); 

  const [students, setStudents] = useState<CardAtt[]>([]);

  const [user, setUser] = useState({} as User);
  const [repos, setRepos] = useState<Repos>({} as Repos);

  function handleAddStudent() {

    const newStudent = {
      name: studentName,
      time: new Date().toLocaleTimeString("pt-br", {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
      })
    };

    setStudents(prevState => [...prevState, newStudent]); 

  }

  useEffect( () => {
      
      fetch('https://api.github.com/users/alberto-gomes/repos')
      .then(response => response.json())
      .then(data => {
        const items = data.map((arraySingleItem: any) => {
          return <li key={shortid.generate()}>{arraySingleItem.name}</li>;
        });

        setRepos({
          name: items
        });

      })

}, []);

  useEffect(() => {
    fetch('https://api.github.com/users/alberto-gomes')
    .then(response => response.json() as ProfileResponse)
    .then(data => {
      setUser({
        name: data.name,
        avatar: data.avatar_url,
        userLink: data.html_url
      })
    })
  },[]); 

  return (
  <div className="container">
    <header>
      <div>
        <h1>Lista de presença</h1>
      </div>
      <div className="user-area">
        <div className="user-pic">
          <a href={user.userLink} target="_blank">
            <img src={user.avatar} alt="Foto de Perfil" />
          </a>
          <strong>{user.name}</strong>
        </div>
        <small>
          <strong>Projetos:</strong>
        <ul>
          {repos.name}
        </ul>
      </small>
      </div>
    </header>

    <input 
      type="text" 
      placeholder='Digite o nome...' 
      onChange={e => setStudentName(e.target.value as unknown as undefined)}
    />
    <button type="button" 
    onClick={handleAddStudent}
    >
      Adicionar
    </button>

      students.map(student => (
        < Card 
          key = {student.time}
          name={student.name} 
          time={student.time} 
        />
      ))
    }
    
  </div>
  )
}