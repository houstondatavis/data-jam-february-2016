d <- data.table::fread('../data/coords.txt', data.table = FALSE, col.names=c("Tag", "Date", "Tweet", "Lat", "Lon", "n_Followers"))
write.table(d, '../data/coords.txt', row.names = FALSE, sep = '\t')
