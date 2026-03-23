import * as React from "react";
import { tv, type VariantProps } from "tailwind-variants";

const tableRowVariants = tv({
  base: "flex items-center w-full px-5 py-4 border-b border-devroast-border",
  variants: {
    variant: {
      default: "hover:bg-devroast-surface transition-colors",
      static: "",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const tableCellVariants = tv({
  base: "flex items-center",
  variants: {
    align: {
      left: "justify-start text-left",
      center: "justify-center text-center",
      right: "justify-end text-right",
    },
  },
  defaultVariants: {
    align: "left",
  },
});

export interface TableRowProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tableRowVariants> {
  children?: React.ReactNode;
}

export interface TableCellProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof tableCellVariants> {
  width?: number | string;
  children?: React.ReactNode;
}

const TableRow = React.forwardRef<HTMLDivElement, TableRowProps>(
  ({ className, variant, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={tableRowVariants({ className, variant })}
        {...props}
      >
        {children}
      </div>
    );
  },
);
TableRow.displayName = "TableRow";

const TableCell = React.forwardRef<HTMLDivElement, TableCellProps>(
  ({ className, align, width, children, style, ...props }, ref) => {
    const cellStyle = {
      width: typeof width === "number" ? `${width}px` : width,
      ...style,
    };

    return (
      <div
        ref={ref}
        className={tableCellVariants({ className, align })}
        style={cellStyle}
        {...props}
      >
        {children}
      </div>
    );
  },
);
TableCell.displayName = "TableCell";

// Leaderboard Row Component - específico para o design DevRoast
export interface LeaderboardRowProps extends Omit<TableRowProps, "children"> {
  rank: string | number;
  score: string | number;
  scoreColor?: "red" | "yellow" | "green" | "default";
  code: string;
  language: string;
}

const LeaderboardRow = React.forwardRef<HTMLDivElement, LeaderboardRowProps>(
  (
    {
      rank,
      score,
      scoreColor = "default",
      code,
      language,
      className,
      ...props
    },
    ref,
  ) => {
    const getScoreColor = () => {
      switch (scoreColor) {
        case "red":
          return "text-devroast-red";
        case "yellow":
          return "text-devroast-orange";
        case "green":
          return "text-devroast-green";
        default:
          return "text-devroast-text-primary";
      }
    };

    return (
      <TableRow ref={ref} className={className} {...props}>
        <TableCell width={40} align="left">
          <span className="text-devroast-text-muted font-mono text-[13px]">
            #{rank}
          </span>
        </TableCell>

        <TableCell width={60} align="left">
          <span
            className={`font-mono text-[13px] font-bold ${getScoreColor()}`}
          >
            {score}
          </span>
        </TableCell>

        <TableCell width="auto" align="left" className="flex-1 mr-6">
          <span className="text-devroast-text-secondary font-mono text-[12px] truncate">
            {code}
          </span>
        </TableCell>

        <TableCell width={100} align="left">
          <span className="text-devroast-text-muted font-mono text-[12px]">
            {language}
          </span>
        </TableCell>
      </TableRow>
    );
  },
);
LeaderboardRow.displayName = "LeaderboardRow";

export {
  TableRow,
  TableCell,
  LeaderboardRow,
  tableRowVariants,
  tableCellVariants,
};
