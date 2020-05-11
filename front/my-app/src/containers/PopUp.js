import React, { Component } from "react";
import { connect } from "react-redux";
import { Snackbar } from "@material-ui/core";
class PopUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      flash: "",
    };
  }

  // componentDidUpdate(prevProps) {
  //   console.log(this.props.flash);
  //   if (this.props.flash !== prevProps.flash) {
  //     this.setState({ flash: this.props.flash });
  //   }
  // }

  componentWillUpdate(nextProps) {
    console.log(nextProps.flash);
    this.setState({ flash: nextProps.flash });
  }

  handleClose = () => {
    this.setState({ flash: "" });
  };

  render() {
    return (
      <Snackbar
        open={this.state.flash !== ""}
        message={this.state.flash}
        autoHideDuration={2000}
        onClose={this.handleClose}
      />
    );
  }
}
function mapStateToProps(state) {
  return { flash: state.auth.message };
}
export default connect(mapStateToProps)(PopUp);
