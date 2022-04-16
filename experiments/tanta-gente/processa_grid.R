library(tidyverse)
library(readxl)
library(jsonlite)

grid1 <- read_excel('grids.xlsx', sheet = 1)
grid2 <- read_excel('grids.xlsx', sheet = 2)
grid3 <- read_excel('grids.xlsx', sheet = 3)

linhas <- 5
colunas <- 7

cells_por_linha <- 9
cells_por_coluna <- 7

grid_h <- linhas * cells_por_linha
grid_w <- colunas * cells_por_coluna

n <- 1
indice <- 1
output <- list()

for (i in 1:grid_h) {
  
  for (j in 1:grid_w) {
    
    estado1 <- ifelse(is.na(as.data.frame(grid1)[i,j]), 0, 1)
    estado2 <- ifelse(is.na(as.data.frame(grid2)[i,j]), 0, 1)
    estado3 <- ifelse(is.na(as.data.frame(grid3)[i,j]), 0, 1)
    
    if (estado1 + estado2 + estado3 == 0) {

    } else {
      
      print(paste(i, j, n%/%49, estado1, estado2, estado3))
      
      output[[indice]] <- list(
        i = n,
        x = i,
        y = j,
        st1 = estado1,
        st2 = estado2,
        st3 = estado3
      )
      
      indice <- indice + 1
      
    }
    
    n <- n + 1
  
  }
  
}

write_json(output, 'grid.json')


plot_grid <- grid1 %>%
  gather(key = "col", value = "valor") %>%
  mutate(x = as.numeric(str_sub(col,4))) %>%
  group_by(col) %>%
  mutate(y = row_number())

ggplot(plot_grid) + geom_point(aes(x = x, y = -y, size = valor))


tam <- length(output)
grid <- data.frame(
  x = rep(0, tam),
  y = rep(0, tam),
  st1 = rep(0, tam))

nn <- 1

for (el in output) {
  
  grid[nn,'x'] = el$x
  grid[nn,'y'] = el$y
  grid[nn,'st1'] = el$st1
  
  nn <- nn+1
  
  
}

ggplot(grid) + geom_point(aes(x = x, y = -y, size = st1))
