CREATE VIEW [dbo].[V_WipSrOutsourceView]
AS
SELECT b.*,a.pid,a.content,a.specs,a.unit,a.qty,a.comment AS detlComment
FROM WipSrOutsourceDetl a
  LEFT JOIN WipSrOutsource b ON a.pid=b.id