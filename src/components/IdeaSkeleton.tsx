import React from 'react';
import { motion } from 'framer-motion';
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Search, Filter } from "lucide-react";

const IdeasSkeleton = () => {
  return (
    <div className="min-h-screen">
      <div className="relative z-10">
        <div className="pt-24 pb-12 px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto text-center"
          >
            <Skeleton className="h-16 w-3/4 mx-auto mb-6" />
            <Skeleton className="h-8 w-1/2 mx-auto mb-12" />
            
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Skeleton className="w-full h-14 rounded-2xl" />
                <Search className="absolute left-4 top-4 text-gray-400" />
              </div>
            </div>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 pb-24">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-64 flex-shrink-0 pt-16">
              <Card className="bg-black/40 backdrop-blur-sm border border-white/10 sticky top-24">
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-4">
                    <Filter className="w-4 h-4 text-green-400" />
                    <Skeleton className="h-6 w-1/2" />
                  </div>
                  <div className="space-y-2">
                    {[1,2,3,4].map((_, index) => (
                      <Skeleton key={index} className="h-10 w-full" />
                    ))}
                  </div>
                </div>
              </Card>
            </div>

            <div className="flex-1">
              <div className="flex justify-end mb-6 gap-2">
                <Skeleton className="h-10 w-20" />
                <Skeleton className="h-10 w-20" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1,2,3,4].map((_, index) => (
                  <Card 
                    key={index}
                    className="bg-black/40 backdrop-blur-sm border border-white/10 hover:border-green-500/50 transition-all duration-200 p-6"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <Skeleton className="h-6 w-1/2" />
                      <Skeleton className="h-6 w-16" />
                    </div>
                    <Skeleton className="h-4 w-full mb-4" />
                    <div className="flex flex-wrap gap-2 mb-4">
                      {[1,2].map((_, catIndex) => (
                        <Skeleton key={catIndex} className="h-6 w-16" />
                      ))}
                    </div>
                    <Skeleton className="h-6 w-16 ml-auto" />
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        <footer className="border-t border-white/10 py-12">
          <div className="max-w-7xl mx-auto px-4">
            <div className="flex justify-center">
              <Skeleton className="h-10 w-40" />
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default IdeasSkeleton;