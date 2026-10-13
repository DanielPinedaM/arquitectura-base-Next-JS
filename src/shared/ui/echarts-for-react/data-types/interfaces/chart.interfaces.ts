/*
 *****************************************************
 * tipos de datos para graficas de echarts-for-react *
 ***************************************************** */

import {
  ChartType,
  IPosition,
  TAlign,
  TFontWeight,
  TLeft,
  TOrient,
  TShape,
  TTop,
  TType,
} from '@/shared/ui/echarts-for-react/data-types/types/chart.types';

/**
tipo de dato para mostrar grafica con la data */
export interface IChartData {
  // #region coordenadas cartesianas
  xAxis?: IxAxis;
  yAxis?: IyAxis;
  grid?: IGrid;
  // #endregion coordenadas cartesianas

  // #region coordenadas de grafico de area polar
  polar?: IPolar | IPolar[];
  radiusAxis?: IRadiusAxis | IRadiusAxis[];
  angleAxis?: IAngleAxis | IAngleAxis[];
  // #endregion coordenadas de grafico de area polar

  // #region grafico radar
  radar?: {
    indicator?: IIndicator[];
    shape?: TShape;
  };
  series?: ISeries | ISeries[];
  // #endregion grafico radar
}

// #region coordenadas cartesianas
interface IxAxis {
  type?: string;
  max?: number;
  splitLine?: ISplitLine;
  axisTick?: IAxisTick;
  axisLabel?: IStyleText;
  axisLine?: IAxisLine;
  data?: string[];
}
interface ISplitLine {
  show?: boolean;
}
interface IyAxis {
  type?: string;
  axisLabel?: IStyleText;
  data?: string[];
  axisTick?: IAxisTick;
  axisLine?: IAxisLine;
}
interface IAxisLine {
  show?: boolean;
}
interface IAxisTick {
  show?: boolean;
}
interface IGrid {
  left?: string;
  right?: string;
  top?: number;
  bottom?: number;
}
// #endregion coordenadas cartesianas

// -----------------------------------------------------------------------------------

// #region coordenadas de grafico de area polar
interface IPolar {
  radius?: (string | number)[] | number[] | string[];
}
export interface IRadiusAxis {
  max?: number;
  polarIndex?: number;
}
export interface IAngleAxis {
  type?: TType;
  startAngle?: number;
  data: string[];
  polarIndex?: number;
  endAngle?: number;
}
// #endregion coordenadas de grafico de area polar

// -----------------------------------------------------------------------------------

// #region grafico radar
export interface IIndicator {
  name?: string;
  max?: number;
}
export interface ISeries {
  name?: string;
  barWidth?: number;
  type?: ChartType;
  radius?: string | string[];
  center?: string[];
  startAngle?: number;
  endAngle?: number;
  avoidLabelOverlap?: boolean;
  label?: ILabel;
  emphasis?: {
    label?: ILabel;
  };
  labelLine?: ILabelLine;
  showBackground?: boolean;
  backgroundStyle?: IBackgroundStyle;
  coordinateSystem?: string;
  polarIndex?: number;

  data: (IDataChart | number)[] | IDataChart[] | number[];
  itemStyle?: IItemStyle;
}
export interface ILabel {
  show?: boolean;
  color?: string;
  fontSize?: number;
  fontWeight?: TFontWeight;
  position?: IPosition | number[];
  formatter?: string | ((...args: any[]) => string);
  align?: TAlign;
}
interface IBackgroundStyle {
  color?: string;
  borderRadius?: number | number[];
}
export interface ILabelLine {
  show?: boolean;
}
// #endregion grafico radar

// -----------------------------------------------------------------------------------

// #region informacion (data) de la grafica
export interface IDataChart {
  value: number | number[];
  name?: string;
  itemStyle?: IItemStyle;
}

export interface IItemStyle {
  color?: string;
  borderRadius?: number | number[];
  borderColor?: string;
  borderWidth?: number;
}

export interface IChartOptions {
  /** titulo y sub-titulo de grafica */
  title?: {
    text?: string;
    subtext?: string;
    left?: TLeft;

    textStyle?: IStyleText;
    subtextStyle?: IStyleText;
  };

  /** leyenda de grafica: A la izquierda tiene un cuadro con color y a la derecha tiene el signifcado del color */
  legend?: {
    orient?: TOrient;
    left?: TLeft;
    top?: TTop;
    textStyle?: IStyleText;
  };
}
// #endregion informacion (data) de la grafica

// -----------------------------------------------------------------------------------

// #region estilos para los textos
export interface IStyleText {
  show?: boolean;
  color?: string;
  fontWeight?: TFontWeight;
  fontSize?: number;
}
// #endregion estilos para los textos

// -----------------------------------------------------------------------------------

// #region componentes de echarts-for-react
/**
props de componente q muestra cualquier grafica de echarts-for-react */
export interface IChartComponentProps {
  type?: ChartType;
  data: IChartData | undefined;
  options?: IChartOptions;

  emptyChartData?: IEmptyChartData;
}

export interface IEmptyChartData {
  message?: string;
  className?: string;
}

/**
props de componente q sirev para
iterar la data dependiendo del tipo de grafica,
permite agregar nuevos tipos de grafica  */
export interface IGetChartOptionsProps {
  type?: ChartType;
  data: IChartData | undefined;
  options?: IChartOptions;
}
// #endregion componentes de echarts-for-react

// -----------------------------------------------------------------------------------
