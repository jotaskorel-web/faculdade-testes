#include <stdio.h>
#define Tf 100 // tamanho fisico: o vetor suporta ate 100 valores
int main(){
    double vet[Tf]; // vetor que pode guardar ate 100 numeros reais
    double  tl, media, soma=0; // soma acumula os valores; media guardara o resultado
    int i; // indice usado para percorrer o vetor

    // Le o tamanho logico: quantas posicoes do vetor serao usadas.
    scanf("%lf", &tl);

    // Le cada valor do vetor e, ao mesmo tempo, adiciona-o na soma.
    for (i= 0; i< tl; i++){
        scanf("%lf", &vet[i]);
        soma += vet[i];
    }

// Depois de somar todos os valores, calcula a media.
media= soma/tl;

// Percorre o vetor novamente, pois agora a media ja e conhecida.
for (i= 0 ; i< tl; i++){
    // Compara o valor atual com a media.
    if (vet[i] > media){
        printf("%.2lf\n", vet[i]);
    }
}
return 0;
}
