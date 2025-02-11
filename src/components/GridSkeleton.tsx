import React from 'react';
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const GridSkeleton = () => {
  return (
    <div className="flex-1">

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4, 5, 6].map((_, index) => (
          <Card
            key={index}
            className="bg-black/40 backdrop-blur-sm border border-white/10 hover:border-green-500/50 transition-all duration-200 p-6"
          >
            <div className="flex justify-between items-start mb-4">
              <div
                className={cn(
                  "animate-pulse rounded-md bg-neutral-300 h-6 w-1/2"
                )}
              />
              <div
                className={cn(
                  "animate-pulse rounded-md bg-neutral-300 h-6 w-16"
                )}
              />
            </div>
            <div
              className={cn(
                "animate-pulse rounded-md bg-neutral-300 h-4 w-full mb-4"
              )}
            />
            <div className="flex flex-wrap gap-2 mb-4">
              {[1, 2].map((_, catIndex) => (
                <div
                  key={catIndex}
                  className={cn(
                    "animate-pulse rounded-md bg-neutral-300 h-6 w-16"
                  )}
                />
              ))}
            </div>
            <div
              className={cn(
                "animate-pulse rounded-md bg-neutral-300 h-6 w-16 ml-auto"
              )}
            />
          </Card>
        ))}
      </div>
    </div>
  );
};

export default GridSkeleton;