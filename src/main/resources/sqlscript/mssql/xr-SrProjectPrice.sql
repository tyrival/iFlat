CREATE TABLE XrSrProjectPrice
(
    id VARCHAR(100),
    projNo VARCHAR(100),
    projName VARCHAR(100),
    code VARCHAR(100),
    category VARCHAR(100),
    unit VARCHAR(100),
    price DECIMAL(18, 2),
    attachment VARCHAR(100),
    comment VARCHAR(100),
    isQuota BIT,
    creatorAcc VARCHAR(100),
    creatorName VARCHAR(100),
    createTime DATETIME,
)