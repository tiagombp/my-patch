library(tidyverse)
library(lubridate)

datas <- data.frame(
  datas = as.Date(c("1979-10-15", "2011-07-21", "2013-10-02", "2016-03-14")),
  marcos = c("nascimento", "beijo", "vi", "do")
) %>%
  mutate(
    ano = year(datas),
    week = lubridate::week(datas)
  ) %>%
  select(-datas)



dias <- as.Date("1979-10-15"):as.Date("2022-01-25")

dias <- lubridate::as_date(dias)

dataset <- data.frame(datas = dias) %>%
  mutate(ano = year(datas),
         dia = lubridate::yday(datas),
         week = lubridate::week(datas)) %>%
  group_by(ano, week) %>%
  summarise() %>%
  ungroup() %>%
  left_join(datas)

ggplot(dataset) + 
  geom_tile(aes(x = week, y = -ano, fill = marcos), height = 1, width = 1, color = 'white') +
  theme_void() + theme(legend.position = 'none')
