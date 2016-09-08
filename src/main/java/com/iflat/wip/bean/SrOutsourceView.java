package com.iflat.wip.bean;

import com.iflat.util.code.CodeUtil;

import java.util.Date;

/**
 * Created by tyriv on 2016/9/8.
 */
public class SrOutsourceView {

    private String id;
    private String name;
    private String projNo;
    private String projName;
    private String projType;
    private String dept;
    private String type;  // 外包/外协/外购

    private boolean type1;
    private boolean type2;
    private boolean type3;

    private String capitalSource;  // 资金来源
    private String matSource;  // 原料来源：公司供料加工|供方供料加工|船方供料加工|公司/船方部分供料，供方部分供料加工
    private Date tod;  // time of delivery 交货期
    private boolean hasBluePrint;
    private boolean hasSample;
    private boolean ownerAppoint;
    private String aplAtt;
    private String aplComment;

    /* 比价 */
    private String bidNo;  // 开标编号
    private String bidType;  // 竞价方式：封闭报价/招投标/客户指定/单一来源

    private boolean bidType1;
    private boolean bidType2;
    private boolean bidType3;
    private boolean bidType4;
    private boolean bidType5;

    private String bidAtt;  // 开标报告、议标报告、报价单等
    private String vendor;  // 推荐供方
    private String vendorType;  // 供应商性质：合格供方/准入供方/临时供方

    private boolean vendorType1;
    private boolean vendorType2;
    private boolean vendorType3;

    private double bidAmountFirst;  // 报价金额
    private double bidAmountSecond;  // 谈价金额
    private double bidAmountDiff;  // 差价
    private String bidComment;  // 单一供方说明
    private double targetCst;
    private boolean bidLowest;

    /* 经营代表确认 */
    private String saleOpinion;  // 经营代表确认意见

    /* 合同信息在结算时上传 */
    private String contNo;  // 合同编号
    private Date contDate;
    private double contAmount;
    private String contAtt;
    private String conComment;

    /* 检验信息 */
    private Date finishTime;  // 完工时间
    private boolean overtime;  // 超期：完工时间晚于交货期
    private String otReason;  // 超期原因
    private String inspResult;  // 检验结果
    private String inspComment;
    private String inspAtt;

    /* 结算 */
    private double settAmountFirst;  // 报价金额
    private double settAmountSecond;  // 谈价金额
    private double settAmountDiff;  // 差价
    private String settComment;
    private String settAtt;

    /* 经营代表确认 */
    private boolean saleReaudit;  // 两次谈价金额不同时，需要经营代表再次确认
    private String saleComment;  // 经营代表确认意见

    private String creatorAcc;
    private String creatorName;
    private Date createTime;
    private String auditorAcc;  // 单船总管
    private String auditorName;
    private String signorAcc;  // 外协科长
    private String signorName;
    private String operatorAcc;  // 外协员
    private String operatorName;
    private String saleAcc;  // 经营代表
    private String saleName;
    private String qcAcc;  // 质检员
    private String qcName;
    private String bdDirectorAcc;  // 事业部领导
    private String bdDirectorName;

    private Date completeTime;  // 完成时间
    private String status;

    private String pid;
    private String content;
    private String specs;
    private String unit;
    private double qty;
    private String detlComment;

    private Date fromDate;
    private Date toDate;

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public boolean isType1() {
        return type1;
    }

    public boolean isType2() {
        return type2;
    }

    public boolean isType3() {
        return type3;
    }

    public boolean isBidType1() {
        return bidType1;
    }

    public boolean isBidType2() {
        return bidType2;
    }

    public boolean isBidType3() {
        return bidType3;
    }

    public boolean isBidType4() {
        return bidType4;
    }

    public boolean isBidType5() {
        return bidType5;
    }

    public boolean isVendorType1() {
        return vendorType1;
    }

    public boolean isVendorType2() {
        return vendorType2;
    }

    public boolean isVendorType3() {
        return vendorType3;
    }

    public double getTargetCst() {
        return targetCst;
    }

    public void setTargetCst(double targetCst) {
        this.targetCst = targetCst;
    }

    public boolean isBidLowest() {
        return bidLowest;
    }

    public void setBidLowest(boolean bidLowest) {
        this.bidLowest = bidLowest;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public Date getFromDate() {
        return fromDate;
    }

    public void setFromDate(Date fromDate) {
        this.fromDate = fromDate;
    }

    public Date getToDate() {
        return toDate;
    }

    public void setToDate(Date toDate) {
        this.toDate = toDate;
    }

    public double getBidAmountDiff() {
        return bidAmountDiff;
    }

    private void setBidAmountDiff() {
        this.bidAmountDiff = bidAmountFirst - bidAmountSecond;
    }

    public double getSettAmountDiff() {
        return settAmountDiff;
    }

    private void setSettAmountDiff() {
        this.settAmountDiff = settAmountFirst - settAmountSecond;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getProjNo() {
        return projNo;
    }

    public void setProjNo(String projNo) {
        this.projNo = projNo;
    }

    public String getProjName() {
        return projName;
    }

    public void setProjName(String projName) {
        this.projName = projName;
    }

    public String getProjType() {
        return projType;
    }

    public void setProjType(String projType) {
        this.projType = projType;
    }

    public String getDept() {
        return dept;
    }

    public void setDept(String dept) {
        this.dept = dept;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
        switch (this.type) {
            case "外包":
                this.type1 = true;
                break;
            case "外协":
                this.type2 = true;
                break;
            case "外购":
                this.type3 = true;
                break;
        }
    }

    public String getCapitalSource() {
        return capitalSource;
    }

    public void setCapitalSource(String capitalSource) {
        this.capitalSource = capitalSource;
    }

    public String getMatSource() {
        return matSource;
    }

    public void setMatSource(String matSource) {
        this.matSource = matSource;
    }

    public Date getTod() {
        return tod;
    }

    public void setTod(Date tod) {
        this.tod = tod;
        setOvertime();
    }

    public boolean isHasBluePrint() {
        return hasBluePrint;
    }

    public void setHasBluePrint(boolean hasBluePrint) {
        this.hasBluePrint = hasBluePrint;
    }

    public boolean isHasSample() {
        return hasSample;
    }

    public void setHasSample(boolean hasSample) {
        this.hasSample = hasSample;
    }

    public boolean isOwnerAppoint() {
        return ownerAppoint;
    }

    public void setOwnerAppoint(boolean ownerAppoint) {
        this.ownerAppoint = ownerAppoint;
    }

    public String getAplAtt() {
        return aplAtt;
    }

    public void setAplAtt(String aplAtt) {
        this.aplAtt = aplAtt;
    }

    public String getAplComment() {
        return aplComment;
    }

    public void setAplComment(String aplComment) {
        this.aplComment = aplComment;
    }

    public String getBidNo() {
        return bidNo;
    }

    public void setBidNo(String bidNo) {
        this.bidNo = bidNo;
    }

    public String getBidType() {
        return bidType;
    }

    public void setBidType(String bidType) {
        this.bidType = bidType;
        switch (this.bidType) {
            case "封闭报价":
                this.bidType1 = true;
                break;
            case "招投标":
                this.bidType2 = true;
                break;
            case "客户指定":
                this.bidType3 = true;
                break;
            case "单一来源":
                this.bidType4 = true;
                break;
            case "传真比价":
                this.bidType5 = true;
                break;
        }
    }

    public String getBidAtt() {
        return bidAtt;
    }

    public void setBidAtt(String bidAtt) {
        this.bidAtt = bidAtt;
    }

    public String getVendor() {
        return vendor;
    }

    public void setVendor(String vendor) {
        this.vendor = vendor;
    }

    public String getVendorType() {
        return vendorType;
    }

    public void setVendorType(String vendorType) {
        this.vendorType = vendorType;
        switch (this.vendorType) {
            case "合格供方":
                this.vendorType1 = true;
                break;
            case "准入供方":
                this.vendorType2 = true;
                break;
            case "临时供方":
                this.vendorType3 = true;
                break;
        }
    }

    public double getBidAmountFirst() {
        return bidAmountFirst;
    }

    public void setBidAmountFirst(double bidAmountFirst) {
        this.bidAmountFirst = bidAmountFirst;
        setBidAmountDiff();
    }

    public double getBidAmountSecond() {
        return bidAmountSecond;
    }

    public void setBidAmountSecond(double bidAmountSecond) {
        this.bidAmountSecond = bidAmountSecond;
        setBidAmountDiff();
        setSaleReaudit();
    }

    public String getBidComment() {
        return bidComment;
    }

    public void setBidComment(String bidComment) {
        this.bidComment = bidComment;
    }

    public String getSaleOpinion() {
        return saleOpinion;
    }

    public void setSaleOpinion(String saleOpinion) {
        this.saleOpinion = saleOpinion;
    }

    public String getContNo() {
        return contNo;
    }

    public void setContNo(String contNo) {
        this.contNo = contNo;
    }

    public Date getContDate() {
        return contDate;
    }

    public void setContDate(Date contDate) {
        this.contDate = contDate;
    }

    public double getContAmount() {
        return contAmount;
    }

    public void setContAmount(double contAmount) {
        this.contAmount = contAmount;
    }

    public String getContAtt() {
        return contAtt;
    }

    public void setContAtt(String contAtt) {
        this.contAtt = contAtt;
    }

    public String getConComment() {
        return conComment;
    }

    public void setConComment(String conComment) {
        this.conComment = conComment;
    }

    public Date getFinishTime() {
        return finishTime;
    }

    public void setFinishTime(Date finishTime) {
        this.finishTime = finishTime;
        setOvertime();
    }

    public boolean isOvertime() {
        return overtime;
    }

    private void setOvertime() {
        if (tod != null && finishTime != null && finishTime.after(tod)) {
            this.overtime = true;
        } else {
            this.overtime = false;
        }
    }

    public String getOtReason() {
        return otReason;
    }

    public void setOtReason(String otReason) {
        this.otReason = otReason;
    }

    public String getInspResult() {
        return inspResult;
    }

    public void setInspResult(String inspResult) {
        this.inspResult = inspResult;
    }

    public String getInspComment() {
        return inspComment;
    }

    public void setInspComment(String inspComment) {
        this.inspComment = inspComment;
    }

    public String getInspAtt() {
        return inspAtt;
    }

    public void setInspAtt(String inspAtt) {
        this.inspAtt = inspAtt;
    }

    public double getSettAmountFirst() {
        return settAmountFirst;
    }

    public void setSettAmountFirst(double settAmountFirst) {
        this.settAmountFirst = settAmountFirst;
        setSettAmountDiff();
    }

    public double getSettAmountSecond() {
        return settAmountSecond;
    }

    public void setSettAmountSecond(double settAmountSecond) {
        this.settAmountSecond = settAmountSecond;
        setSettAmountDiff();
        setSaleReaudit();
    }

    public String getSettComment() {
        return settComment;
    }

    public void setSettComment(String settComment) {
        this.settComment = settComment;
    }

    public String getSettAtt() {
        return settAtt;
    }

    public void setSettAtt(String settAtt) {
        this.settAtt = settAtt;
    }

    public boolean isSaleReaudit() {
        return saleReaudit;
    }

    private void setSaleReaudit() {
        if (this.bidAmountSecond != this.settAmountSecond) {
            this.saleReaudit = true;
        } else {
            this.saleReaudit = false;
        }
    }

    public String getSaleComment() {
        return saleComment;
    }

    public void setSaleComment(String saleComment) {
        this.saleComment = saleComment;
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

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getAuditorAcc() {
        return auditorAcc;
    }

    public void setAuditorAcc(String auditorAcc) {
        this.auditorAcc = auditorAcc;
    }

    public String getAuditorName() {
        return auditorName;
    }

    public void setAuditorName(String auditorName) {
        this.auditorName = auditorName;
    }

    public String getSignorAcc() {
        return signorAcc;
    }

    public void setSignorAcc(String signorAcc) {
        this.signorAcc = signorAcc;
    }

    public String getSignorName() {
        return signorName;
    }

    public void setSignorName(String signorName) {
        this.signorName = signorName;
    }

    public String getOperatorAcc() {
        return operatorAcc;
    }

    public void setOperatorAcc(String operatorAcc) {
        this.operatorAcc = operatorAcc;
    }

    public String getOperatorName() {
        return operatorName;
    }

    public void setOperatorName(String operatorName) {
        this.operatorName = operatorName;
    }

    public String getSaleAcc() {
        return saleAcc;
    }

    public void setSaleAcc(String saleAcc) {
        this.saleAcc = saleAcc;
    }

    public String getSaleName() {
        return saleName;
    }

    public void setSaleName(String saleName) {
        this.saleName = saleName;
    }

    public String getQcAcc() {
        return qcAcc;
    }

    public void setQcAcc(String qcAcc) {
        this.qcAcc = qcAcc;
    }

    public String getQcName() {
        return qcName;
    }

    public void setQcName(String qcName) {
        this.qcName = qcName;
    }

    public String getBdDirectorAcc() {
        return bdDirectorAcc;
    }

    public void setBdDirectorAcc(String bdDirectorAcc) {
        this.bdDirectorAcc = bdDirectorAcc;
    }

    public String getBdDirectorName() {
        return bdDirectorName;
    }

    public void setBdDirectorName(String bdDirectorName) {
        this.bdDirectorName = bdDirectorName;
    }

    public Date getCompleteTime() {
        return completeTime;
    }

    public void setCompleteTime(Date completeTime) {
        this.completeTime = completeTime;
    }

    public String getPid() {
        return pid;
    }

    public void setPid(String pid) {
        this.pid = pid;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getSpecs() {
        return specs;
    }

    public void setSpecs(String specs) {
        this.specs = specs;
    }

    public String getUnit() {
        return unit;
    }

    public void setUnit(String unit) {
        this.unit = unit;
    }

    public double getQty() {
        return qty;
    }

    public void setQty(double qty) {
        this.qty = qty;
    }

    public String getDetlComment() {
        return detlComment;
    }

    public void setDetlComment(String detlComment) {
        this.detlComment = detlComment;
    }
}
