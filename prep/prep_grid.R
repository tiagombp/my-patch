library(tidyverse)
library(readxl)

grid <- readxl::read_excel('characters8bit.xlsx', sheet = 'letters') %>%
  select(-1) %>% as.matrix()

starting_lines <- seq(1, nrow(grid), 8)
starting_cols <- seq(1, ncol(grid), 8)

output <- list()

simbolos <- c(letters, "heart", "exclamation", "smile", "ellipsis")


letter_no <- 1
  
for (starting_line in starting_lines) {
  
  for (starting_col in starting_cols) {
    
    #print(paste(starting_line, starting_col, letter_no))
    
    seq <- 0
    vetor_saida <- NULL
    
    i <- 0
    j <- 0
    
    for (i in 0:7) {
      
      for (j in 0:7) {
        
        el <- grid[[i+starting_line, j+starting_col]] %>% unlist()
        
        print(paste(starting_line, starting_col, i, j, el, seq))
        
        seq <- seq + 1
        
        if (el == 1 & !is.na(el)) {
          
          vetor_saida <- c(vetor_saida, seq-1)
          
        } else {
          
          next
          
        }
        
      }
    
    }
    
    output[[simbolos[letter_no]]] <- vetor_saida
    letter_no <- letter_no+1
  }
  
  
}
  

# drawings ----------------------------------------------------------------

bar_chart <- readxl::read_excel('characters8bit.xlsx', 
                                sheet = 'bar_chart',
                                range = 'B1:AO40') %>%
  as.matrix()

lista_bar_chart <- list()
seq <- 0
list_position <- 1

for (i in 1:nrow(bar_chart)) {
  
  for (j in 1:ncol(bar_chart)) {
    
    el <- bar_chart[[i, j]] %>% unlist()
    
    print(paste(i, j, el, seq))
    
    seq <- seq + 1
    
    if (!is.na(el)) {
      
      elemento <- list()
      elemento[["pos"]] <- seq-1
      elemento[["cor"]] <- el
      
      lista_bar_chart[[list_position]] <- elemento
      
      list_position <- list_position + 1
      
    } else {
      
      next
      
    }
    
  }
  
}



# output ------------------------------------------------------------------

general_output <- list(
  letters = output,
  drawings = list(
    bar_chart = lista_bar_chart
  )
)

library(jsonify)
library(jsonlite)

jsonlite::write_json(general_output, "grid.json")

