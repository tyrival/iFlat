package com.iflat.xr.bean;

import com.iflat.util.MathUtil;

import java.util.Date;

/**
 * Created by tyriv on 2016/8/25.
 */
public class Benefit {
    private String id;
    private Date month;
    private String dept;
    private String teamCode;
    private String team;
    private double workday;  // 总人工
    private double manhour;  // 总工时
    private double personNum;  // 注册人数
    private double workPersonTime;  // 到岗人次
    private double waitPersonTime;  // 等工人次
    private double casualInPersonTime;  // 临时借进人次
    private double casualOutPersonTime;  // 临时借出人次
    private double salaryPersonNum;  // 应发工资发放人数
    private double averagePersonNum;  // 在厂平均人数

    private double laborExpense; // 工费
    private double quarterProjectBonus;  // 季度单船绩效奖
    private double waitSubsidy;  // 等工补贴
    private double springFestivalSubsidy;  // 春节加班补贴
    private double springFestivalStable;  // 春节稳定金
    private double dinnerSubsidy;  // 餐费补贴
    private double temperatureSubsidy;  // 高温补贴
    private double incomeSum;  // 小计

    private double payableSalary;  // 劳务工应发工资
    private double rent;  // 房水电
    private double dinnerSelf;  // 餐费自付
    private double insurance;  // 保险费
    private double material;  // 仓库领用材料费
    private double taxes;  // 税金
    private double expenseSum;  // 小计

    private double profits;  // 利润
    private double salaryPercent;  // 劳务工应发工资占工费比例
    private double productionPer;  // 人均产值（工费）
    private double salaryPerFull;  // 人均工资（满负荷）
    private double salaryPerAct;  // 人均工资（在厂人员）
    private String comment;  // 备注

    private Date fromDate;
    private Date toDate;

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

    public Date getMonth() {
        return month;
    }

    public void setMonth(Date month) {
        this.month = month;
    }

    public double getProfits() {
        return profits;
    }

    private void setProfits() {
        this.profits = this.incomeSum - this.expenseSum;
    }

    public double getSalaryPercent() {
        return salaryPercent;
    }

    private void setSalaryPercent() {
        if ((laborExpense + quarterProjectBonus) != 0) {
            this.salaryPercent = payableSalary * 100 / (laborExpense + quarterProjectBonus);
        }
        this.salaryPercent = MathUtil.round(this.salaryPercent, 2);
    }

    public double getProductionPer() {
        return productionPer;
    }

    private void setProductionPer() {
        if (workPersonTime != 0) {
            this.productionPer = (laborExpense + quarterProjectBonus) / workPersonTime;
        }
        this.productionPer = MathUtil.round(this.productionPer, 2);
    }

    public double getSalaryPerFull() {
        return salaryPerFull;
    }

    private void setSalaryPerFull() {
        if (workPersonTime != 0) {
            this.salaryPerFull = payableSalary / workPersonTime;
        }
        this.salaryPerFull = MathUtil.round(this.salaryPerFull, 2);
    }

    public double getSalaryPerAct() {
        return salaryPerAct;
    }

    private void setSalaryPerAct() {
        if (averagePersonNum != 0) {
            this.salaryPerAct = payableSalary / averagePersonNum;
        }
        this.salaryPerAct = MathUtil.round(this.salaryPerAct, 2);
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getDept() {
        return dept;
    }

    public void setDept(String dept) {
        this.dept = dept;
    }

    public String getTeamCode() {
        return teamCode;
    }

    public void setTeamCode(String teamCode) {
        this.teamCode = teamCode;
    }

    public String getTeam() {
        return team;
    }

    public void setTeam(String team) {
        this.team = team;
    }

    public double getWorkday() {
        return workday;
    }

    public void setWorkday(double workday) {
        this.workday = workday;
    }

    public double getManhour() {
        return manhour;
    }

    public void setManhour(double manhour) {
        this.manhour = manhour;
    }

    public double getPersonNum() {
        return personNum;
    }

    public void setPersonNum(double personNum) {
        this.personNum = personNum;
    }

    public double getWorkPersonTime() {
        return workPersonTime;
    }

    public void setWorkPersonTime(double workPersonTime) {
        this.workPersonTime = workPersonTime;
        setProductionPer();
        setSalaryPerFull();
    }

    public double getWaitPersonTime() {
        return waitPersonTime;
    }

    public void setWaitPersonTime(double waitPersonTime) {
        this.waitPersonTime = waitPersonTime;
    }

    public double getCasualInPersonTime() {
        return casualInPersonTime;
    }

    public void setCasualInPersonTime(double casualInPersonTime) {
        this.casualInPersonTime = casualInPersonTime;
    }

    public double getCasualOutPersonTime() {
        return casualOutPersonTime;
    }

    public void setCasualOutPersonTime(double casualOutPersonTime) {
        this.casualOutPersonTime = casualOutPersonTime;
    }

    public double getSalaryPersonNum() {
        return salaryPersonNum;
    }

    public void setSalaryPersonNum(double salaryPersonNum) {
        this.salaryPersonNum = salaryPersonNum;
    }

    public double getAveragePersonNum() {
        return averagePersonNum;
    }

    public void setAveragePersonNum(double averagePersonNum) {
        this.averagePersonNum = averagePersonNum;
        setSalaryPerAct();
    }

    public double getQuarterProjectBonus() {
        return quarterProjectBonus;
    }

    public void setQuarterProjectBonus(double quarterProjectBonus) {
        this.quarterProjectBonus = quarterProjectBonus;
        setIncomeSum();
        setSalaryPercent();
        setProductionPer();
    }

    public double getWaitSubsidy() {
        return waitSubsidy;
    }

    public void setWaitSubsidy(double waitSubsidy) {
        this.waitSubsidy = waitSubsidy;
        setIncomeSum();
    }

    public double getSpringFestivalSubsidy() {
        return springFestivalSubsidy;
    }

    public void setSpringFestivalSubsidy(double springFestivalSubsidy) {
        this.springFestivalSubsidy = springFestivalSubsidy;
        setIncomeSum();
    }

    public double getSpringFestivalStable() {
        return springFestivalStable;
    }

    public void setSpringFestivalStable(double springFestivalStable) {
        this.springFestivalStable = springFestivalStable;
        setIncomeSum();
    }

    public double getDinnerSubsidy() {
        return dinnerSubsidy;
    }

    public void setDinnerSubsidy(double dinnerSubsidy) {
        this.dinnerSubsidy = dinnerSubsidy;
        setIncomeSum();
    }

    public double getTemperatureSubsidy() {
        return temperatureSubsidy;
    }

    public void setTemperatureSubsidy(double temperatureSubsidy) {
        this.temperatureSubsidy = temperatureSubsidy;
        setIncomeSum();
    }

    public double getIncomeSum() {
        return incomeSum;
    }

    private void setIncomeSum() {
        this.incomeSum = quarterProjectBonus + waitSubsidy + springFestivalSubsidy + springFestivalStable + dinnerSubsidy + temperatureSubsidy + laborExpense;
        setTaxes();
        setProfits();
        setSalaryPercent();
        setProductionPer();
    }

    public double getPayableSalary() {
        return payableSalary;
    }

    public void setPayableSalary(double payableSalary) {
        this.payableSalary = payableSalary;
        setExpenseSum();
        setSalaryPercent();
        setSalaryPerFull();
        setSalaryPerAct();
    }

    public double getRent() {
        return rent;
    }

    public void setRent(double rent) {
        this.rent = rent;
        setExpenseSum();
    }

    public double getDinnerSelf() {
        return dinnerSelf;
    }

    public void setDinnerSelf(double dinnerSelf) {
        this.dinnerSelf = dinnerSelf;
        setExpenseSum();
    }

    public double getInsurance() {
        return insurance;
    }

    public void setInsurance(double insurance) {
        this.insurance = insurance;
        setExpenseSum();
    }

    public double getMaterial() {
        return material;
    }

    public void setMaterial(double material) {
        this.material = material;
        setExpenseSum();
    }

    public double getTaxes() {
        return taxes;
    }

    private void setTaxes() {
        this.taxes = MathUtil.round(this.incomeSum * 0.0415, 2);
        setExpenseSum();
    }

    public double getExpenseSum() {
        return expenseSum;
    }

    private void setExpenseSum() {
        this.expenseSum = payableSalary + rent + dinnerSelf + insurance + material + taxes;
        setProfits();
    }

    public double getLaborExpense() {
        return laborExpense;
    }

    public void setLaborExpense(double laborExpense) {
        this.laborExpense = laborExpense;
        this.setIncomeSum();
    }
}
