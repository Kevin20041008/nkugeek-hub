# Events Archive Template

只有实际举办并有来源的活动才能进入归档。未提供的资源填 null，不生成占位链接。

- id / title / date：稳定标识、名称、含时区的实际时间
- source：组织者发布的公开活动记录
- slides：幻灯片链接或 null
- video：获得授权的录像链接或 null
- repo：活动代码或实验仓库链接或 null
- notes：公开笔记链接或 null
- participants：主动同意署名的参与者公开账号链接；不公开填 []
- outcomes：Demo、PR、报告等实际成果链接；没有成果填 []

更新 src/data/community.ts 中的 archivedEvents，提交来源与授权说明。
活动结束后保留归档 URL。不要用预告日期替代举办证明，也不要填报估计参与人数。
