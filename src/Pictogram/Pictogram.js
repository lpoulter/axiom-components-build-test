import PropTypes from "prop-types";
import React, { Component } from "react";
import Base from "../Base/Base";
import "./Pictogram.css";
import annotation from "./svgs/annotation.svg";

// const PICTOGRAM_NAME_MAP = {

// 'bar-percent-chart': import from ('./svgs/bar-percent-chart.svg'),
// '3d-globe': import from ('./svgs/3d-globe.svg'),
// 'choropleth-map': import from ('./svgs/choropleth-map.svg'),
// 'circle-pack': import from ('./svgs/circle-pack.svg'),
// 'column-chart': import from ('./svgs/column-chart.svg'),
// 'date-&-time': import from ('./svgs/date-&-time.svg'),
// 'featured-content': import from ('./svgs/featured-content.svg'),
// 'female': import from ('./svgs/female.svg'),
// 'file-upload': import from ('./svgs/file-upload.svg'),
// 'frequency-heatmap': import from ('./svgs/frequency-heatmap.svg'),
// 'individual': import from ('./svgs/individual.svg'),
// 'key-stat': import from ('./svgs/key-stat.svg'),
// 'male': import from ('./svgs/male.svg'),
// 'networks': import from ('./svgs/networks.svg'),
// 'organisation': import from ('./svgs/organisation.svg'),
// 'pie-chart': import from ('./svgs/pie-chart.svg'),
// 'polar-chart': import from ('./svgs/polar-chart.svg'),
// 'spline-chart': import from ('./svgs/spline-chart.svg'),
// 'stream-graph': import from ('./svgs/stream-graph.svg'),
// 'table': import from ('./svgs/table.svg'),
// 'tree-map': import from ('./svgs/tree-map.svg'),
// 'twitter-verified': import from ('./svgs/twitter-verified.svg'),
// 'video': import from ('./svgs/video.svg'),
// 'weather': import from ('./svgs/weather.svg'),
// 'web-url': import from ('./svgs/web-url.svg'),
// 'word-cloud': import from ('./svgs/word-cloud.svg'),
// };

export default class Pictogram extends Component {
  static propTypes = {
    /** Name of the pictogram that will be displayed */
    name: PropTypes.oneOf([
      "3d-globe",
      "annotation",
      "bar-chart",
      "bar-percent-chart",
      "choropleth-map",
      "circle-pack",
      "column-chart",
      "date-&-time",
      "featured-content",
      "female",
      "file-upload",
      "frequency-heatmap",
      "individual",
      "key-stat",
      "male",
      "networks",
      "organisation",
      "pie-chart",
      "polar-chart",
      "spline-chart",
      "stream-graph",
      "table",
      "tree-map",
      "twitter-verified",
      "video",
      "weather",
      "web-url",
      "word-cloud"
    ]),
    /** Size of pictogram (with unit) */
    size: PropTypes.string
  };

  static defaultProps = {
    size: "3rem"
  };

  render() {
    const { name, size, ...rest } = this.props;
    const style = { width: size, height: size };

    if (!PICTOGRAM_NAME_MAP[name]) {
      return null;
    }

    const { body, viewBox } = PICTOGRAM_NAME_MAP[name];

    return (
      <Base
        {...rest}
        Component="svg"
        className="ax-pictogram"
        dangerouslySetInnerHTML={{ __html: body }}
        style={style}
        viewBox={viewBox}
      />
    );
  }
}
