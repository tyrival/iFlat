CREATE TABLE WipSrOsBidding
(
    id CHAR(36),
    pid CHAR(36),
    vendor VARCHAR(200),
    vendorType VARCHAR(100),
    amount DECIMAL(18, 2),
    amountAdj DECIMAL(18, 2),
    comment VARCHAR(2000),
    creatorAcc VARCHAR(20),
    creatorName VARCHAR(100),
    createTime DATETIME,
)