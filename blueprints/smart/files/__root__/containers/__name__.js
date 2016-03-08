import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const propTypes = {
};

export class <%= pascalEntityName %> extends Component {
  props: Props;

  render() {
    return (
      <div></div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
}
const mapDispatchToProps = (dispatch) => {
  return {};
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(<%= pascalEntityName %>);
