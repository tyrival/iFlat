package com.iflat.pam.bean;

import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by tyriv on 2016/7/29.
 */
public class MonthlyWork {

    private String id;
    private Date month;
    private String pbName;
    private String confBig;  // 三会一课-形式（支部大会/支委会/党小组会/党课）
    private String confCom;  // 三会一课-形式（支部大会/支委会/党小组会/党课）
    private String confGroup;  // 三会一课-形式（支部大会/支委会/党小组会/党课）
    private String confClass;  // 三会一课-形式（支部大会/支委会/党小组会/党课）
    private String confContent;
    private int devApplyNum;
    private int devApplyNumSum;
    private int devActivistNum;
    private int devActivistNumSum;
    private int devCandidateNum;
    private int devFullMemberNum;
    private boolean tmIsStable;
    private boolean tmHasPlan;
    private String tmMeasure;
    private String mbStableMeasure;
    private String mbFocus;
    private String mbProblem;
    private String scMeasure;  // spiritual culture 精神文化
    private String aiSituation;  // advanced individual 先进个人
    private String suMassWork;  // sub-union 分工会
    private String seSubject;  // subject education 主题教育
    private String seEffect;
    private String mpWork;  // monthly plan
    private String wiLightspot;  // work innovation 创新
    private String attachment;
    private String status;
    private String creatorAcc;
    private String creatorName;
    private Date createrTime;

    private String text;
    private String parentId;
    private boolean leaf;

    public MonthlyWork() {
        leaf = true;
    }

    public String getText() {
        return text;
    }

    public String getParentId() {
        return parentId;
    }

    public void setParentId(String parentId) {
        this.parentId = parentId;
    }

    public boolean isLeaf() {
        return leaf;
    }

    public void setLeaf(boolean leaf) {
        this.leaf = leaf;
    }

    public String getAttachment() {
        return attachment;
    }

    public void setAttachment(String attachment) {
        this.attachment = attachment;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Date getMonth() {
        return month;
    }

    public void setMonth(Date month) {
        this.month = month;
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM");
        this.text = sdf.format(month);
    }

    public String getPbName() {
        return pbName;
    }

    public void setPbName(String pbName) {
        this.pbName = pbName;
    }

    public String getConfBig() {
        return confBig;
    }

    public void setConfBig(String confBig) {
        this.confBig = confBig;
    }

    public String getConfCom() {
        return confCom;
    }

    public void setConfCom(String confCom) {
        this.confCom = confCom;
    }

    public String getConfGroup() {
        return confGroup;
    }

    public void setConfGroup(String confGroup) {
        this.confGroup = confGroup;
    }

    public String getConfClass() {
        return confClass;
    }

    public void setConfClass(String confClass) {
        this.confClass = confClass;
    }

    public String getConfContent() {
        return confContent;
    }

    public void setConfContent(String confContent) {
        this.confContent = confContent;
    }

    public int getDevApplyNum() {
        return devApplyNum;
    }

    public void setDevApplyNum(int devApplyNum) {
        this.devApplyNum = devApplyNum;
    }

    public int getDevApplyNumSum() {
        return devApplyNumSum;
    }

    public void setDevApplyNumSum(int devApplyNumSum) {
        this.devApplyNumSum = devApplyNumSum;
    }

    public int getDevActivistNum() {
        return devActivistNum;
    }

    public void setDevActivistNum(int devActivistNum) {
        this.devActivistNum = devActivistNum;
    }

    public int getDevActivistNumSum() {
        return devActivistNumSum;
    }

    public void setDevActivistNumSum(int devActivistNumSum) {
        this.devActivistNumSum = devActivistNumSum;
    }

    public int getDevCandidateNum() {
        return devCandidateNum;
    }

    public void setDevCandidateNum(int devCandidateNum) {
        this.devCandidateNum = devCandidateNum;
    }

    public int getDevFullMemberNum() {
        return devFullMemberNum;
    }

    public void setDevFullMemberNum(int devFullMemberNum) {
        this.devFullMemberNum = devFullMemberNum;
    }

    public boolean isTmIsStable() {
        return tmIsStable;
    }

    public void setTmIsStable(boolean tmIsStable) {
        this.tmIsStable = tmIsStable;
    }

    public boolean isTmHasPlan() {
        return tmHasPlan;
    }

    public void setTmHasPlan(boolean tmHasPlan) {
        this.tmHasPlan = tmHasPlan;
    }

    public String getTmMeasure() {
        return tmMeasure;
    }

    public void setTmMeasure(String tmMeasure) {
        this.tmMeasure = tmMeasure;
    }

    public String getMbStableMeasure() {
        return mbStableMeasure;
    }

    public void setMbStableMeasure(String mbStableMeasure) {
        this.mbStableMeasure = mbStableMeasure;
    }

    public String getMbFocus() {
        return mbFocus;
    }

    public void setMbFocus(String mbFocus) {
        this.mbFocus = mbFocus;
    }

    public String getMbProblem() {
        return mbProblem;
    }

    public void setMbProblem(String mbProblem) {
        this.mbProblem = mbProblem;
    }

    public String getScMeasure() {
        return scMeasure;
    }

    public void setScMeasure(String scMeasure) {
        this.scMeasure = scMeasure;
    }

    public String getAiSituation() {
        return aiSituation;
    }

    public void setAiSituation(String aiSituation) {
        this.aiSituation = aiSituation;
    }

    public String getSuMassWork() {
        return suMassWork;
    }

    public void setSuMassWork(String suMassWork) {
        this.suMassWork = suMassWork;
    }

    public String getSeSubject() {
        return seSubject;
    }

    public void setSeSubject(String seSubject) {
        this.seSubject = seSubject;
    }

    public String getSeEffect() {
        return seEffect;
    }

    public void setSeEffect(String seEffect) {
        this.seEffect = seEffect;
    }

    public String getMpWork() {
        return mpWork;
    }

    public void setMpWork(String mpWork) {
        this.mpWork = mpWork;
    }

    public String getWiLightspot() {
        return wiLightspot;
    }

    public void setWiLightspot(String wiLightspot) {
        this.wiLightspot = wiLightspot;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getCreatorAcc() {
        return creatorAcc;
    }

    public void setCreatorAcc(String creatorAcc) {
        this.creatorAcc = creatorAcc;
    }

    public String getCreatorName() {
        return creatorName;
    }

    public void setCreatorName(String creatorName) {
        this.creatorName = creatorName;
    }

    public Date getCreaterTime() {
        return createrTime;
    }

    public void setCreaterTime(Date createrTime) {
        this.createrTime = createrTime;
    }
}
