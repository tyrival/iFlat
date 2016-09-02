CREATE TABLE WipSrOsInspect
(
    id CHAR(36),
    pid CHAR(36),
    date DATETIME,
    result VARCHAR(100),
    description VARCHAR(MAX),
    creatorAcc VARCHAR(20),
    creatorName VARCHAR(100),
    createTime DATETIME,
)