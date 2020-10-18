import React from "react";
import PropTypes from "prop-types";
import { Message, Icon } from "semantic-ui-react";
import { Link } from "react-router-dom";
import axios from "axios";

class ConfirmationPage extends React.Component {
  state = {
    loading: true,
    success: false
  };

  componentDidMount() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let token = params.get('token');

    axios.post(`http://localhost:4000/email-verify?token=${token}`)
      .then(() => this.setState({ loading: false, success: true }))
      .catch(() => this.setState({ loading: false, success: false }));
  }

  render() {
    const { loading, success } = this.state;

    return (
      <div style={{marginTop:'150px'}}>
        {loading && (
          <Message icon>
            <Icon name="circle notched" loading />
            <Message.Header>Validating your email</Message.Header>
          </Message>
        )}

        {!loading &&
        success && (
          <Message success icon>
            <Icon name="checkmark" />
            <Message.Content>
              <Message.Header>
                Thank you. Your account has been verified.
              </Message.Header>
              <Link to="/signin">Log in</Link>
            </Message.Content>
          </Message>
        )}

        {!loading &&
        !success && (
          <Message negative icon>
            <Icon name="warning sign" />
            <Message.Content>
              <Message.Header>Ooops. Invalid token it seems.</Message.Header>
            </Message.Content>
          </Message>
        )}
      </div>
    );
  }
}


export default ConfirmationPage;
