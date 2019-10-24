import React from 'react';

class SendMessageForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
    };
  }

  handleChange = e => {
    console.log(e.target.value);
    this.setState({
      message: e.target.value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.sendMessage(this.state.message);
    this.setState({ message: '' });
  };

  render() {
    return (
      <form className="send-message-form" onSubmit={this.handleSubmit}>
        <input
          disabled={this.props.disabled}
          onChange={this.handleChange}
          value={this.state.message}
          placeholder="Type your message and hit ENTER"
          type="text"
        />
      </form>
    );
  }
}

export default SendMessageForm;
