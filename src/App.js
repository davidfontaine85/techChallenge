import React, { useState, useEffect } from 'react';     //Using React Hooks
import Axios from 'axios';                              //Using Axios to cleaning lisibility of Async Queries
import Header from './Components/Header';               //Static Component for clean code
import Footer from './Components/Footer';               //Static Component for clean code
import './App.css';                                     //Import CSS thanks to Boss Jason (with some adjustments to set the three columns display)

function App() {

  //State declaration on str to insert and on Array to Select and display
  const [newMember, setNewMember] = useState('');
  const [crewList, setCrewList] = useState([]);


  //Using Hooks to pass through class component and avoid ComponentDidMount and ComponentDidUpdate Method
  //Fetch all crew_membername from crew_members table return in Array in const crewList
  useEffect(()=> {
    const fetchData = async () => {
      Axios.get('https://tech-challenge-wild-code.herokuapp.com/api/get').then((response)=> {
        setCrewList(response.data);
        console.log(response.data);
      });
    }
    fetchData();
  }, []);


  //Pass input Value to newMember which is send to backend by POST method from Axios
  //And will be use as string to prepare query
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
