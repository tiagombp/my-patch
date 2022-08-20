library(tidyverse)
library(lubridate)

datas <- data.frame(
  datas = as.Date(c("1979-10-15", "2011-07-21", "2013-10-02", "2016-03-14")),
  marcos = c("nascimento", "beijo", "vi", "do")
)

dias <- as.Date("1979-10-15"):as.Date("2022-01-25")

dias <- lubridate::as_date(dias)

dataset <- data.frame(datas = dias) %>%
  left_join(datas) %>%
  mutate(ano = year(datas),
         dia = lubridate::yday(datas))

ggplot(dataset) + 
  geom_tile(aes(x = dia, y = -ano, fill = datas > "2011-07-21"), height = .4, width = .4, color = 'white') +
  theme_void() + theme(legend.position = 'none')
