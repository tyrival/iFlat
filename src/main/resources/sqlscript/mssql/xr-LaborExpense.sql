CREATE TABLE XrLaborExpense
(
    projNo VARCHAR(100),
    projName VARCHAR(100),
    deptCode VARCHAR(100),
    dept VARCHAR(100),
    teamCode VARCHAR(100),
    team VARCHAR(100),
    amountFirst DECIMAL(18, 2),
    amountSecond DECIMAL(18, 2),
    amountDiff DECIMAL(18, 2),
    amountRating DECIMAL(18, 2),
    amountWithDiscount DECIMAL(18, 2),
    settlementTime DATETIME,
    status VARCHAR(100),
    createTime DATETIME,
)