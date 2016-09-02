CREATE TABLE WipSrOsAssess
(
    id CHAR(36),
    pid CHAR(36),
    description VARCHAR(MAX),
    fineAmount DECIMAL(18, 2),
    creatorAcc VARCHAR(20),
    creatorName VARCHAR(100),
    creatorRole VARCHAR(100),
    createTime DATETIME,
);
