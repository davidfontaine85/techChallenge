import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import Header from './Components/Header';
import Footer from './Components/Footer';
import './App.css';
import axios from 'axios';

function App() {

  const [newMember, setNewMember] = useState('');
  const [crewList, setCrewList] = useState([]);

  /*useEffect(()=>{
    Axios.get("https://tech-challenge-wild-code.herokuapp.com/api/get").then((response)=>{
      //setCrewList(response);
      console.log(response.data);
    });
  }, []);*/

  useEffect(()=> {
    const fetchData = async () => {
      Axios.get('https://tech-challenge-wild-code.herokuapp.com/api/get').then((response)=> {
        setCrewList(response.data);
        console.log(response.data);
      });
    }
    fetchData();
  }, []);

  const submitNewMember = () =>{
    Axios.post("https://tech-challenge-wild-code.herokuapp.com/api/insert", {newMember: newMember}).then(()=>{
      alert("Nouveau membre ajouter à l'équipage!");
    });
  }

  return (
    <div className="App">
      <Header />

      {/*-- Main section --*/}
      <main>
        
        {/*--Add Member Form Component--*/}
        <div>
              {/*-- New member form --*/}
            <h2>Ajouter un(e) Argonaute</h2>
            <form className="new-member-form">
                <label htmlFor="name">Nom de l&apos;Argonaute</label>
                <input id="name" name="name" type="text" placeholder="Charalampos" onChange={(e)=> {
                  setNewMember(e.target.value);
                }}/>
                <button type="submit" onClick={submitNewMember}>Envoyer</button>
            </form>
          </div>
        
        {/*-- Member list Display Component --*/}
        <div>
            <h2>Membres de l'équipage</h2>
            <section className="member-list">
                {crewList.map((item)=>{
                  return (
                    <div key={item.id} className="member-item">{item.crew_membername}</div>
                  );
                })}
            </section>
          </div>
      </main>

      <Footer />

    </div>
  );
}

export default App;
