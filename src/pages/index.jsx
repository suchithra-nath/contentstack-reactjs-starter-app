/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
import React from "react"
import Stack from "../sdk/entry"

import Layout from "../components/layout"
import RenderComponenets from "../components/render-components"

class Home extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      entry: undefined,
      header: undefined,
      footer: undefined,
      error: { errorStatus: false, errorCode: undefined, errorData: undefined },
    }
  }

  async componentDidMount() {
    try {
      const result = await Stack.getEntryByUrl(
        "page",
        this.props.location.pathname,
        ["page_components.from_blog.featured_blogs"]
      )
      const header = await Stack.getEntry(
        "header",
        "navigation_menu.page_reference"
      )
      const footer = await Stack.getEntry("footer")
      this.setState({
        entry: result[0],
        header: header[0][0],
        footer: footer[0][0],
        error: { errorStatus: false },
      })
    } catch (error) {
      this.setState({
        error: { errorStatus: true, errorCode: 404, errorData: error },
      })
    }
  }

  render() {
    const { header, footer, entry, error } = this.state
    const { history } = this.props
    if (!error.errorStatus && entry) {
      return (
        <Layout
          header={header}
          footer={footer}
          seo={entry.seo}
          activeTab="Home"
        >
          <RenderComponenets pageComponents={entry.page_components} />
        </Layout>
      )
    }

    if (error.errorStatus) {
      history.push("/error", [error])
    }
    return ""
  }
}
export default Home
