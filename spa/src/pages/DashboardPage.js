import React, { Component } from 'react';
import NavlogComponent from '../components/NavlogComponent';

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        name: '', // Adiciona o campo 'name' ao estado do usuário
        email: '' // Adiciona o campo 'email' ao estado do usuário
      }
    };
  }

  render() {
    const { user } = this.state;

    return (
      <div>
        <NavlogComponent />
        <div className="container mt-5">
          {user && (
            <>
              <h1 className="text-black">Welcome to your profile, {user.name}</h1> 
              <p>Email: {user.email}</p>
            </>
          )}
        </div>
      </div>
    );
  }
}

export default Dashboard;
