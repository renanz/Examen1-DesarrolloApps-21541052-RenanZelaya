import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = { city: '', condition: '', temperature: '' };
  }

  componentDidMount() {
    const {
      match: { params }
    } = this.props;
    axios
      .get(
        `https://api.github.com/repos/${params.username}/${
          params.repoName
        }/readme`
      )
      .then(info => {
        let url = info.data.download_url;
        axios
          .get(`${url}`)
          .then(res =>
            this.setState(() => ({
              readme: res.data,
              name: params.repoName,
              username: params.username
            }))
          )
          .catch(err2 => console.log(err2.message)); 
      })
      .catch(err => {
        console.log(err.message); 
        this.setState(() => ({
          readme: 'No hay readme disponible',
          name: params.repoName,
          username: params.username
        }));
      });
  }

  render() {
    return (
      <div className='center'>
        <div>
            <h1>
                {this.state.city}
            </h1>
            <br/>
            <h2>
                {this.state.condition}
            </h2>
            <br/>
            <h2>
                {this.state.temperature}
            </h2>
        </div>
        <div>
            
        </div>


      </div>
    );
  }
}

Home.propTypes = {
  match: PropTypes.object.isRequired
};

export default Home;
