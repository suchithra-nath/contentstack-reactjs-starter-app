/* eslint-disable react/prop-types */
import React from "react"
import moment from "moment"
import ReactHtmlParser from "react-html-parser"
import Stack from "../sdk/entry"
import Layout from "../components/layout"

import ArchiveRelative from "../components/archive-relative"
import RenderComponents from "../components/render-components"

class BlogPost extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      entry: undefined,
      banner: undefined,
      header: undefined,
      footer: undefined,
      error: { errorStatus: false, errorCode: undefined, errorData: undefined },
    }
  }

  async componentDidMount() {
    try {
      const banner = await Stack.getEntryByUrl("page", "/blog")
      const { location } = this.props
      const blog = await Stack.getEntryByUrl("blog_post", location.pathname, [
        "author",
        "related_post",
      ])
      const header = await Stack.getEntry(
        "header",
        "navigation_menu.page_reference"
      )
      const footer = await Stack.getEntry("footer")
      this.setState({
        entry: blog[0],
        banner: banner[0],
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
    const { header, footer, entry, error, banner } = this.state
    const { history } = this.props
    if (!error.errorStatus && entry) {
      return (
        <Layout
          header={header}
          footer={footer}
          seo={entry.seo}
          activeTab="Blog"
        >
          <RenderComponents pageComponents={banner.page_components} blogsPage />
          <div className="blog-container">
            <div className="blog-detail">
              <h2>{entry.title ? entry.title : ""}</h2>
              <p>
                {moment(entry.date).format("ddd, MMM D YYYY")},{" "}
                <strong>{entry.author[0].title}</strong>
              </p>
              {ReactHtmlParser(entry.body)}
            </div>
            <div className="blog-column-right">
              <div className="related-post">
                {banner.page_components[2].widget && (
                  <h2>{banner.page_components[2].widget.title_h2}</h2>
                )}
                {entry.related_post && (
                  <ArchiveRelative blogs={entry.related_post} />
                )}
              </div>
            </div>
          </div>
        </Layout>
      )
    }
    if (error.errorStatus) {
      history.push("/error", [error])
    }
    return ""
  }
}
export default BlogPost
