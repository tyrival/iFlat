package com.iflat.report.bean.util;

/**
 * Created by tyriv on 2015/11/23.
 */
public class Graph {

    private String id;
    private String paintId;
    private String type;
    private String coordinate;
    private String lineWidth;

    private String relationId;
    private String fillText;
    private String font;

    private String strokeStyle;
    private String fontStyle;
    private String fillStyle;

    public String getRelationId() {
        return relationId;
    }

    public void setRelationId(String relationId) {
        this.relationId = relationId;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getPaintId() {
        return paintId;
    }

    public void setPaintId(String paintId) {
        this.paintId = paintId;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getCoordinate() {
        return coordinate;
    }

    public void setCoordinate(String coordinate) {
        this.coordinate = coordinate;
    }

    public String getLineWidth() {
        return lineWidth;
    }

    public void setLineWidth(String lineWidth) {
        this.lineWidth = lineWidth;
    }

    public String getFillText() {
        return fillText;
    }

    public void setFillText(String fillText) {
        this.fillText = fillText;
    }

    public String getFont() {
        return font;
    }

    public void setFont(String font) {
        this.font = font;
    }

    public String getStrokeStyle() {
        return strokeStyle;
    }

    public void setStrokeStyle(String strokeStyle) {
        this.strokeStyle = strokeStyle;
    }

    public String getFontStyle() {
        return fontStyle;
    }

    public void setFontStyle(String fontStyle) {
        this.fontStyle = fontStyle;
    }

    public String getFillStyle() {
        return fillStyle;
    }

    public void setFillStyle(String fillStyle) {
        this.fillStyle = fillStyle;
    }
}
