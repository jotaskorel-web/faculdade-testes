#include <stdio.h>
#define Tf 50 // tamanho fisico: o vetor suporta no maximo 50 valores
int main (){
    float vet [Tf]; // vetor que pode guardar ate 50 numeros reais
   int tl, i; // tl = tamanho logico; i = indice usado nos lacos
   float menor, maior; // guardarao o menor e o maior valor encontrados

   // Le quantas posicoes do vetor serao preenchidas.
   scanf("%d", &tl);

   // Le cada numero e o guarda em uma posicao do vetor.
   for (i = 0; i < tl; i++){
       scanf("%f", &vet[i]);
}

// Comecamos considerando o primeiro valor como menor e maior.
// Depois, os demais valores poderao substituir essas variaveis.
menor = vet[0];
maior = vet[0];

// Compara cada valor do vetor com o menor e o maior atuais.
for (i = 0; i < tl; i++){
    // Se o valor atual for menor, ele passa a ser o novo menor.
    if(vet[i] < menor){
        menor = vet[i];
    }
    // Se o valor atual for maior, ele passa a ser o novo maior.
    if(vet[i] > maior){
        maior = vet[i];
    }
}
// Mostra os resultados com duas casas decimais.
printf("Menor: %.2f\n", menor);
printf("Maior: %.2f\n", maior);
return 0;
}