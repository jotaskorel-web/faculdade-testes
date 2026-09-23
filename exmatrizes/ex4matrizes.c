#include <stdio.h>

#define Tf 10 // capacidade maxima: cada matriz guarda ate 10x10 reais

// Preenche tll linhas e tlc colunas. Cada matriz chega aqui com o proprio tamanho.
void lerMatriz(float mat[Tf][Tf], int tll, int tlc) {
    int i, j;

    for (i = 0; i < tll; i++) {
        for (j = 0; j < tlc; j++) {
            scanf("%f", &mat[i][j]);
        }
    }
}

// Cij = Aij + Bij. O resultado fica guardado em C, por isso a funcao e void.
void somarMatrizes(float A[Tf][Tf], float B[Tf][Tf], float C[Tf][Tf], int tll, int tlc) {
    int i, j;

    for (i = 0; i < tll; i++) {
        for (j = 0; j < tlc; j++) {
            C[i][j] = A[i][j] + B[i][j];
        }
    }
}

// Mostra a parte logica da matriz, linha por linha.
void exibirMatriz(float mat[Tf][Tf], int tll, int tlc) {
    int i, j;

    for (i = 0; i < tll; i++) {
        for (j = 0; j < tlc; j++) {
            printf("%.2f ", mat[i][j]);
        }
        printf("\n");
    }
}

int main() {
    float A[Tf][Tf];
    float B[Tf][Tf];
    float C[Tf][Tf];
    int TLLA, TLLB, TLCA, TLCB;

    // TLL = linhas usadas; TLC = colunas usadas. A e B tem os seus.
    scanf("%d", &TLLA);
    scanf("%d", &TLCA);
    lerMatriz(A, TLLA, TLCA);

    scanf("%d", &TLLB);
    scanf("%d", &TLCB);
    lerMatriz(B, TLLB, TLCB);

    // Cij = Aij + Bij so existe quando as duas matrizes tem o mesmo tamanho logico.
    if (TLLA == TLLB && TLCA == TLCB) {
        somarMatrizes(A, B, C, TLLA, TLCA);
        exibirMatriz(C, TLLA, TLCA);
    }

    return 0;
}
