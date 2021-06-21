/* eslint-disable no-console */
import React from "react"
import Stack from "../sdk/entry"
import Layout from "../components/layout"

export default class Error extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      header: undefined,
      footer: undefined,
    }
  }

  async componentDidMount() {
    try {
      const header = await Stack.getEntry(
        "header",
        "navigation_menu.page_reference"
      )
      const footer = await Stack.getEntry("footer")
      this.setState({
        header: header[0][0],
        footer: footer[0][0],
      })
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    const { header, footer } = this.state
    if (header && footer) {
      return (
        <Layout header={header} footer={footer}>
          <div className="error-page">
            <h1>404: Not Found</h1>
            <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
          </div>
        </Layout>
      )
    }

    return ""
  }
}
