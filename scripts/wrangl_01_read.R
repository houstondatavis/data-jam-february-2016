
# load some libs
library(bit64)
library(dplyr)
library(ggmap)

#' read and parse the tsv
#'
#' @param x input file
#' @param y output file
#'
#' @return a parsed data frame
massage <- function(x, y){
  
  message("> reading")
  dat = data.table::fread(x, data.table = FALSE)
  colnames(dat) = tolower(colnames(dat))
  
  message("> massaging")
  dat = mutate(dat, 
               date2 = as.POSIXct(date/1000, origin = "1970-01-01", tz = "UTC"), 
               date = as.Date(date2),
               time = format(date2, "%H:%M")
  )
  
  message("> writing")
  write.table(dat, y, quote = TRUE, sep = "\t", row.names = FALSE)
  invisible(dat)
}

#' add addresses to the data
#'
#' @param dat 
#'
#' @return a data.frame with a new address column
#' @importFrom ggmap revgeocode
find_address <- function(dat){
  addrs <- apply(dat, 1, function(d){
    message(".")
    #print(d)
    pos = revgeocode(as.numeric(c(d[["long"]], d[["lat"]])))
  })
  dat$address = addrs
  dat
}

if(FALSE){
  x = "data/depression.tsv"
  dep = massage("data/depression.tsv", "data/depression_2.tsv")
  dep2 = massage("data/depressed.tsv", "data/depressed_2.tsv")
  sui = massage("data/suicide.tsv", "data/suicide_2.tsv")
  alc = massage("data/alcoholic.tsv", "data/alcoholic_2.tsv")
  
  # merge the datasets
  dat = bind_rows(dep, dep2, sui, alc)
}

# write this out
#write.table(dep2, "data/depressed_2.tsv", quote = TRUE, sep = "\t")
#write.table(alc, "data/alcoholic_2.tsv", quote = TRUE, sep = "\t")
#write.table(sui, "data/suicide_2.tsv", quote = TRUE, sep = "\t")





# 