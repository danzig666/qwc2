/**
 * Copyright 2016, Sourcepole AG.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree.
 */

const React = require('react');
const PropTypes = require('prop-types');
const Message = require('../../MapStore2Components/components/I18N/Message');
const ResizeableWindow = require("../components/ResizeableWindow");
require('./style/LayerInfoWindow.css');

class LayerInfoWindow extends React.Component {
    static propTypes = {
        layer: PropTypes.object,
        sublayer: PropTypes.object,
        onClose: PropTypes.func,
        windowSize: PropTypes.object
    }
    renderLink(text, url) {
        return url ? (<a href={url} target="_blank">{text}</a>) : text ? text : null;
    }
    renderRow = (title, content) => {
        if(content) {
            return (
                <tr>
                    <td><Message msgId={title} />:</td>
                    <td>{content}</td>
                </tr>
            );
        }
        return null;
    }
    render() {
        let legend = null;
        if(this.props.layer.legendUrl) {
            let request = this.props.layer.legendUrl + (this.props.layer.legendUrl.indexOf('?') === -1 ? '?' : '&') + "SERVICE=WMS&REQUEST=GetLegendGraphic&VERSION=" + (this.props.layer.version || "1.3.0") + "&FORMAT=image/png&LAYER=" + this.props.sublayer.name + "&STYLE=default";
            legend = (<img className="layer-info-window-legend" src={request} />);
        }
        return (
            <ResizeableWindow title="layerinfo.title" glyphicon="info-sign" onClose={this.props.onClose} initialWidth={this.props.windowSize.width} initialHeight={this.props.windowSize.height}>
                <div role="body" className="layer-info-window-body">
                    <h4 className="layer-info-window-title">{this.props.sublayer.title}</h4>
                    <div className="layer-info-window-frame">
                        <table className="layer-info-window-table">
                            <tbody>
                            {this.renderRow("layerinfo.abstract", this.props.sublayer.abstract)}
                            {this.props.sublayer.attribution ? this.renderRow("layerinfo.attribution", this.renderLink(this.props.sublayer.attribution.Title, this.props.sublayer.attribution.OnlineResource)) : null}
                            {this.renderRow("layerinfo.keywords", this.props.sublayer.keywords)}
                            {this.renderRow("layerinfo.dataUrl", this.renderLink(this.props.sublayer.dataUrl, this.props.sublayer.dataUrl))}
                            {this.renderRow("layerinfo.metadataUrl", this.renderLink(this.props.sublayer.metadataUrl, this.props.sublayer.metadataUrl))}
                            {this.renderRow("layerinfo.legend", legend)}
                            </tbody>
                        </table>
                    </div>
                </div>
            </ResizeableWindow>
        );
    }
};

module.exports = LayerInfoWindow;
