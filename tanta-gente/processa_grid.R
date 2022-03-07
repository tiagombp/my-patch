library(tidyverse)
library(readxl)

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

for (j in 1:grid_h) {
  
  for (i in 1:grid_w) {
    
    estado1 <- ifelse(is.na(as.data.frame(grid1)[i,j]), 0, 1)
    estado2 <- ifelse(is.na(as.data.frame(grid2)[i,j]), 0, 1)
    estado3 <- ifelse(is.na(as.data.frame(grid3)[i,j]), 0, 1)
    
    if (estado1 + estado2 + estado3 == 0) {

    } else {
      
      print(paste(i, j, estado1, estado2, estado3))
      
      output[[indice]] <- list(
        i = n,
        x = i,
        y = j,
        st1 = unlist(estado1),
        st2 = estado2,
        st3 = estado3
      )
      
      indice <- indice + 1
      
    }
    
    n <- n + 1
  
  }
  
}
